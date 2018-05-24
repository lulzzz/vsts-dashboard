// @ts-ignore
import * as vm from 'vso-node-api';
import * as ba from 'vso-node-api/BuildApi';
import * as bi from 'vso-node-api/interfaces/BuildInterfaces';
import BuildData from './build-data';

export default class BuildService {
  public async getBuilds(): Promise<BuildData[]> {
    const builds: BuildData[] = [];
    const vsts: vm.WebApi = await this.getApi();
    const vstsBuild: ba.IBuildApi = await vsts.getBuildApi();
    const project = process.env.VSTS_PROJECT;
    const defs: bi.BuildDefinitionReference[] = await vstsBuild.getDefinitions(project);
    for (const d of defs) {
      const build: bi.Build[] = await vstsBuild.getBuilds(
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
      builds.push({
        buildNumber: build[0].buildNumber,
        endTime: build[0].finishTime,
        name: build[0].definition.name,
        result: build[0].result,
        startTime: build[0].startTime,
        status: build[0].status,
        url: build[0]._links.web.href,
        user: build[0].requestedFor.displayName
      });
    }
    return builds.sort((a, b) => (a.name.toUpperCase() <= b.name.toUpperCase() ? -1 : 1));
  }

  private async getApi(): Promise<vm.WebApi> {
    return new Promise<vm.WebApi>(async (resolve, reject) => {
      try {
        const serverUrl = process.env.VSTS_URL;
        const token = process.env.VSTS_TOKEN;
        const authHandler = vm.getPersonalAccessTokenHandler(token);
        const option = undefined;

        const vsts: vm.WebApi = new vm.WebApi(serverUrl, authHandler, option);
        await vsts.connect();

        resolve(vsts);
      } catch (err) {
        reject(err);
      }
    });
  }
}
