class LocalStorageMock {
  private store: any;

  public constructor() {
    this.store = {};
  }

  public clear(): void {
    this.store = {};
  }

  public getItem(key: string): string {
    return this.store[key] || undefined;
  }

  public removeItem(key: string): void {
    delete this.store[key];
  }

  public setItem(key: string, value: string): void {
    this.store[key] = value.toString();
  }
}

// @ts-ignore
global.localStorage = new LocalStorageMock();
