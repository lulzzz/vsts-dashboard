// @ts-ignore
import * as vm from 'vso-node-api';
import * as ba from 'vso-node-api/BuildApi';
import * as bi from 'vso-node-api/interfaces/BuildInterfaces';
import BuildData from './build-data';

export default class BuildService {
  public async getBuilds(): Promise<BuildData[]> {
    const vsts: vm.WebApi = await this.getApi();
    const vstsBuild: ba.IBuildApi = await vsts.getBuildApi();
    const project = this.getEnv('API_PROJECT');
    const buildInfo: bi.Build[] = await vstsBuild.getBuilds(
      project,
      undefined, // definitions: number[]
      undefined, // queues: number[]
      undefined, // buildNumber
      undefined,
      undefined, // maxFinishTime
      undefined, // requestedFor: string
      bi.BuildReason.All, // reason
      bi.BuildStatus.Completed,
      bi.BuildResult.Succeeded,
      undefined, // tagFilters: string[]
      undefined, // properties: string[]
      10 // top: number
    );
    const builds: BuildData[] = [];
    buildInfo.forEach(b => {
      builds.push({
        BuildNumber: b.buildNumber,
        Name: b.definition.name,
        Status: b.result === 2,
        User: b.requestedFor.displayName
      });
    });
    return builds;
  }

  private async getApi(): Promise<vm.WebApi> {
    return new Promise<vm.WebApi>(async (resolve, reject) => {
      try {
        const serverUrl = this.getEnv('API_URL');
        const token = this.getEnv('API_TOKEN');
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

  private getEnv(name: string): string {
    return process.env[name] as string;
  }
}
