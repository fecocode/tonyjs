import { ITrigger } from "../types/pubsub/trigger";

interface ITestTrigger extends ITrigger {
  name: string;
  run(test: string): Promise<void>;
}

export class TestTrigger implements ITestTrigger {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  async run(): Promise<void> {
    console.log(`Hello desde el trigger ${this.name}`);
  }
}
