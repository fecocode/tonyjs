export interface ITrigger {
  run(...args: any[]): Promise<void>;
}
