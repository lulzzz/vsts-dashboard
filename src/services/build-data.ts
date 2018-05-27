import { Build, BuildResult, BuildStatus } from 'vso-node-api/interfaces/BuildInterfaces';

/**
 * Represents the build data from VSTS
 */
export class BuildData {
  /**
   * The branch of the build
   */
  public branch: string;

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

  /**
   * The constructor for our build wrapper
   *
   * The reasoning for this wrapper is to keep the build data in the UI to a minimum
   * and so we can add utility functions that helps build the UI
   */
  public constructor(build: Build) {
    this.branch = build.sourceBranch;
    this.buildNumber = build.buildNumber;
    this.endTime = build.finishTime;
    this.name = build.definition.name;
    this.result = build.result;
    this.startTime = build.startTime;
    this.status = build.status;
    this.url = build.url;
    this.user = build.requestedFor.displayName;
  }

  /**
   * Is the build finished based on status information from VSTS
   */
  public isFinished(): boolean {
    if (this.status === BuildStatus.Completed) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Is the build queued, or in a state of pending, based on status information from VSTS
   */
  public isQueued(): boolean {
    if (this.status === BuildStatus.NotStarted || this.status === BuildStatus.Postponed) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Is the build currently running based on status information from VSTS
   */
  public isRunning(): boolean {
    if (this.status === BuildStatus.Cancelling || this.status === BuildStatus.InProgress) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Was the build successful or not
   */
  public wasSuccessful(): boolean {
    if (this.result === BuildResult.Succeeded) {
      return true;
    } else {
      return false;
    }
  }
}
