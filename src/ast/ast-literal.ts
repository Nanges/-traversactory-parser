import { Visitable } from '../utils/visitable';
import { ASTLiteralVisitor } from './ast-visitor';

abstract class ASTValue implements Visitable<ASTLiteralVisitor> {
  constructor(readonly value: string) {}
  abstract accept(visitor: ASTLiteralVisitor): void;
}

export class ASTString extends ASTValue {
  constructor(value: string) {
    super(value);
  }

  accept(visitor: ASTLiteralVisitor): void {
    visitor.visitString(this);
  }
}

export class ASTNumber extends ASTValue {
  accept(visitor: ASTLiteralVisitor): void {
    visitor.visitNumber(this);
  }
}

export class ASTTrue implements Visitable<ASTLiteralVisitor> {
  accept(visitor: ASTLiteralVisitor): void {
    visitor.visitTrue(this);
  }
}

export class ASTFalse implements Visitable<ASTLiteralVisitor> {
  accept(visitor: ASTLiteralVisitor): void {
    visitor.visitFalse(this);
  }
}

export class ASTNull implements Visitable<ASTLiteralVisitor> {
  accept(visitor: ASTLiteralVisitor): void {
    visitor.visitNull(this);
  }
}
