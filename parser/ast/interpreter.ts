import { Visitable } from '../utils/visitable';
import { ASTNumber, ASTString } from './ast-literal';
import { ASTArray, ASTObject, ASTTree } from './ast-tree';
import { ASTLiteralVisitor, ASTVisitor } from './ast-visitor';
import { BaseReviver, DefaultReviver, Reviver, ReviverFn } from './reviver';

export class ASTInterpreter implements ASTVisitor {
  private currentValue: any;
  private readonly reviver: BaseReviver;

  static interprete(tree: ASTTree, reviver?: ReviverFn) {
    const interpreter = new ASTInterpreter(reviver);
    tree.accept(interpreter);
    return interpreter.currentValue;
  }

  private constructor(reviverFn?: ReviverFn) {
    this.reviver = reviverFn ? new Reviver(reviverFn) : new DefaultReviver();
  }

  visitObject(o: ASTObject): void {
    const instance: any = {};

    for (const [key, value] of o.properties) {
      this.reviver.handleValue(key, (handle) => {
        value?.accept(this);
        instance[key] = handle(this.currentValue);
      });
    }

    this.currentValue = instance;
  }

  visitArray(o: ASTArray): void {
    const instance: any[] = [];

    o.items.forEach((item, index) => {
      this.reviver.handleValue(index, (handle) => {
        item.accept(this);
        instance.push(handle(this.currentValue));
      });
    });

    this.currentValue = instance;
  }

  visitString(o: ASTString): void {
    this.currentValue = o.value;
  }

  visitNumber(o: ASTNumber): void {
    this.currentValue = Number(o.value);
  }

  visitTrue(o: Visitable<ASTLiteralVisitor>): void {
    this.currentValue = true;
  }

  visitFalse(o: Visitable<ASTLiteralVisitor>): void {
    this.currentValue = false;
  }

  visitNull(o: Visitable<ASTLiteralVisitor>): void {
    this.currentValue = null;
  }
}
