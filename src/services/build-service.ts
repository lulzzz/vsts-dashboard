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
    const project = process.env.API_PROJECT;
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
        BuildNumber: build[0].buildNumber,
        EndTime: build[0].finishTime,
        Name: build[0].definition.name,
        StartTime: build[0].startTime,
        Status: build[0].result === 2,
        User: build[0].requestedFor.displayName
      });
    }
    return builds;
    return builds.sort((a, b) => (a.Name <= b.Name ? -1 : 1));
  }

  private async getApi(): Promise<vm.WebApi> {
    return new Promise<vm.WebApi>(async (resolve, reject) => {
      try {
        const serverUrl = process.env.API_URL;
        const token = process.env.API_TOKEN;
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
