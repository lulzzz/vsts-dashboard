export class ConfigService {
  public get Token(): string {
    return process.env.VSTS_TOKEN as string;
  }

  public get AccountURL(): string {
    return process.env.VSTS_URL as string;
  }

  public get ProjectName(): string {
    return process.env.VSTS_PROJECT as string;
  }
}
