export class ConfigService {
  private readonly projectKey: string = 'VSTS_PROJECT';
  private readonly tokenKey: string = 'VSTS_TOKEN';
  private readonly urlKey: string = 'VSTS_URL';

  /**
   * Gets the authentication token for VSTS
   */
  public get Token(): string {
    return this.getFromStorage(this.tokenKey);
  }

  /**
   * Sets the authentication token for VSTS
   */
  public set Token(value: string) {
    this.saveToStorage(this.tokenKey, value);
  }

  /**
   * Gets the VSTS account URL
   */
  public get AccountURL(): string {
    return this.getFromStorage(this.urlKey);
  }

  /**
   * Sets the VSTS account URL
   */
  public set AccountURL(value: string) {
    this.saveToStorage(this.urlKey, value);
  }

  /**
   * Gets the VSTS project name
   */
  public get ProjectName(): string {
    return this.getFromStorage(this.projectKey);
  }

  /**
   * Sets the VSTS project name
   */
  public set ProjectName(value: string) {
    this.saveToStorage(this.projectKey, value);
  }

  /**
   * Gets a string from the local storage with the
   * key passed to it
   * @param key The key to get the data from
   */
  private getFromStorage(key: string): string {
    return localStorage.getItem(key) as string;
  }

  /**
   * Stores a string in the local storage cache
   * @param key The key to store the data under
   * @param value The string value to store
   */
  private saveToStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
