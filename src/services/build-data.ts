/**
 * Represents the build data from VSTS
 */
export default class BuildData {
  /**
   * The build number
   */
  public buildNumber: string;

  /**
   * The time the build finished
   */
  public endTime: Date;

  /**
   * The name of the build
   */
  public name: string;

  /**
   * The result of the build
   */
  public result: number;

  /**
   * The time the build was kicked off
   */
  public startTime: Date;

  /**
   * The status of the build
   */
  public status: number;

  /**
   * The link to the build details on VSTS
   */
  public url: string;

  /**
   * The user who kicked the build off
   */
  public user: string;
}
