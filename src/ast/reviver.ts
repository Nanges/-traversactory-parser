export type ReviverFn = (value: any, path: (string | number)[]) => any;

type HandleValue = (value: any) => any;

export abstract class BaseReviver {
  abstract handleValue(key: string | number, fn: (handle: HandleValue) => void): void;
}

export class DefaultReviver extends BaseReviver {
  handleValue(key: string | number, fn: (handle: HandleValue) => void): void {
    fn((v) => v);
  }
}

export class Reviver extends BaseReviver {
  private readonly path: (string | number)[] = [];

  constructor(private readonly reviverFn: ReviverFn) {
    super();
  }

  handleValue(key: string | number, fn: (handle: HandleValue) => void): void {
    this.path.push(key);
    fn((v) => this.reviverFn(v, [...this.path]));
    this.path.pop();
  }
}
