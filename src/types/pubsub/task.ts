import { _Method } from "../general/general-types";
import { ITrigger } from "./trigger";

export type PosibleTaskStatus = "waiting" | "processing" | "done";

export interface ITask {
  trigger: ITrigger;
  dependencies: ITask[];
  status: PosibleTaskStatus;

  run(): Promise<void>;
  finalize(): Promise<void>;

  setParent(parent: ITask): void;
  isDone(): boolean;

  $beforeRun(method: _Method): void;
  $running(method: _Method): void;
  $afterRun(method: _Method): void;
}

export class Task implements ITask {
  trigger: ITrigger;
  dependencies: ITask[];
  status: PosibleTaskStatus;

  _parent: ITask | undefined;

  _beforeRunMethod: _Method | undefined;
  _runningMethod: _Method | undefined;
  _afterRunMethod: _Method | undefined;

  constructor(trigger: ITrigger, dependencies: ITask[]) {
    this.trigger = trigger;
    this.dependencies = dependencies;
    this._parent = undefined;
    this.status = "waiting";

    this._beforeRunMethod = undefined;
    this._runningMethod = undefined;
    this._afterRunMethod = undefined;

    this.dependencies.forEach((dependency) => {
      dependency.setParent(this);
    });
  }

  private _pendingDependency(): ITask | null {
    for (const dependency of this.dependencies) {
      if (!dependency.isDone()) return dependency;
    }

    return null;
  }
  setParent(parent: ITask): void {
    this._parent = parent;
  }

  async run(): Promise<void> {
    const pending = this._pendingDependency();

    if (!pending) {
      if (this._beforeRunMethod) await this._beforeRunMethod();
      if (this._runningMethod) await this._runningMethod();

      this.status = "processing";

      try {
        await this.trigger.run();
        this.finalize();
        return;
      } catch (err) {
        console.error(err);
      }
    } else {
      pending.run();
    }
  }
  async finalize(): Promise<void> {
    if (this._afterRunMethod) await this._afterRunMethod();

    this.status = "done";
    if (this._parent) this._parent.run();
  }
  isDone(): boolean {
    return this.status === "done";
  }

  $beforeRun(method: _Method): void {
    this._beforeRunMethod = method;
  }
  $running(method: _Method): void {
    this._runningMethod = method;
  }
  $afterRun(method: _Method): void {
    this._afterRunMethod = method;
  }
}
