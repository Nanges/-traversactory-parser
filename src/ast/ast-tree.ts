import { Visitable } from '../utils/visitable';
import { ASTString } from './ast-literal';
import { ASTArrayVisitor, ASTNodeVisitor, ASTObjectVisitor, ASTVisitor } from './ast-visitor';

export interface ASTNode extends Visitable<ASTNodeVisitor> {
  append(child: Visitable<ASTVisitor>): void;
}

type Property = [string, Visitable<ASTVisitor> | undefined];

export class ASTObject implements ASTNode {
  readonly properties: Property[] = [];
  private currentKey!: string;
  private _append: (item: Visitable<ASTVisitor>) => void;

  constructor() {
    this._append = this.appendKey;
  }

  append(item: Visitable<ASTVisitor>): void {
    this._append(item);
  }

  accept(visitor: ASTObjectVisitor): void {
    visitor.visitObject(this);
  }

  private appendKey(item: Visitable<ASTVisitor>) {
    if (!(item instanceof ASTString)) throw new Error();
    this.currentKey = item.value;
    this._append = this.appendValue;
  }

  private appendValue(item: Visitable<ASTVisitor>) {
    this.properties.push([this.currentKey, item]);
    this._append = this.appendKey;
  }
}

export class ASTArray implements ASTNode {
  readonly items: Visitable<ASTVisitor>[] = [];

  append(child: Visitable<ASTVisitor>): void {
    this.items.push(child);
  }

  accept(visitor: ASTArrayVisitor): void {
    visitor.visitArray(this);
  }
}
