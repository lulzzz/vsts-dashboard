// @ts-ignore
import { Build, BuildDefinitionReference, getPersonalAccessTokenHandler, IBuildApi, WebApi } from 'vso-node-api';
import { BuildData } from './build-data';

/**
 * Responsible for wrapping the VSTS Web calls
 */
export class BuildService {
  /**
   * Get the builds from VSTS
   */
  public async getBuilds(): Promise<BuildData[]> {
    const builds: BuildData[] = [];
    const vsts: WebApi = await this.getApi();
    const vstsBuild: IBuildApi = await vsts.getBuildApi();
    const project: string | undefined = process.env.VSTS_PROJECT;
    const defs: BuildDefinitionReference[] = await vstsBuild.getDefinitions(project);
    for (const d of defs) {
      const build: Build[] = await vstsBuild.getBuilds(
        project,
        [d.id],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        1
      );

      builds.push(new BuildData(build[0]));
    }

    return builds.sort((a: BuildData, b: BuildData) => (a.name.toUpperCase() <= b.name.toUpperCase() ? -1 : 1));
  }

  /**
   * Wrapper to get the API, based on some environment variables we have
   */
  private async getApi(): Promise<WebApi> {
    return new Promise<WebApi>(async (resolve, reject) => {
      try {
        const serverUrl: string = process.env.VSTS_URL as string;
        const token: string = process.env.VSTS_TOKEN as string;
        const authHandler = getPersonalAccessTokenHandler(token);
        const option = undefined;

        const vsts: WebApi = new WebApi(serverUrl, authHandler, option);
        await vsts.connect();

        resolve(vsts);
      } catch (err) {
        reject(err);
      }
    });
  }
}
