import { Visitable } from '../visitable';
import { ASTNumber, ASTString } from './ast-literal';
import { ASTArray, ASTObject, ASTTree } from './ast-tree';
import { ASTLiteralVisitor, ASTVisitor } from './ast-visitor';

export class ASTInterpreter implements ASTVisitor {
  private currentValue: any;

  static interprete(tree: ASTTree) {
    const interpreter = new ASTInterpreter();
    tree.accept(interpreter);
    return interpreter.currentValue;
  }

  private constructor() {}

  visitObject(o: ASTObject): void {
    const instance: any = {};

    for (const [key, value] of o.properties) {
      value?.accept(this);
      instance[key] = this.currentValue;
    }

    this.currentValue = instance;
  }

  visitArray(o: ASTArray): void {
    const instance: any[] = [];

    for (const item of o.items) {
      item.accept(this);
      instance.push(this.currentValue);
    }

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
