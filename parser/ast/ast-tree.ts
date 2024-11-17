import { Visitable } from '../visitable';
import { ASTString } from './ast-literal';
import { ASTArrayVisitor, ASTObjectVisitor, ASTTreeVisitor, ASTVisitor } from './ast-visitor';

export abstract class ASTTree extends Visitable<ASTTreeVisitor> {
  constructor() {
    super();
  }

  abstract append(child: Visitable<ASTVisitor>): void;
}

type Property = [string, Visitable<ASTVisitor> | undefined];

export class ASTObject extends ASTTree {
  readonly properties: Property[] = [];
  private currentKey!: string;
  private _append: (item: Visitable<ASTVisitor>) => void;

  constructor() {
    super();
    this._append = this.appendKey;
  }

  append(item: Visitable<ASTVisitor>): void {
    this._append(item);
  }

  accept(visitor: ASTObjectVisitor): void {
    visitor.visitObject(this);
  }

  private appendKey(item: Visitable<ASTVisitor>) {
    if (!(item instanceof ASTString)) throw new Error(`Invalid token`);
    this.currentKey = item.value;
    this._append = this.appendValue;
  }

  private appendValue(item: Visitable<ASTVisitor>) {
    this.properties.push([this.currentKey, item]);
    this._append = this.appendKey;
  }
}

export class ASTArray extends ASTTree {
  readonly items: Visitable<ASTVisitor>[] = [];

  append(child: Visitable<ASTVisitor>): void {
    this.items.push(child);
  }

  accept(visitor: ASTArrayVisitor): void {
    visitor.visitArray(this);
  }
}
