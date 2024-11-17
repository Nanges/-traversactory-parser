import { Visitable } from '../visitable';
import { ASTLiteralVisitor } from './ast-visitor';

abstract class ASTValue extends Visitable<ASTLiteralVisitor> {
  constructor(readonly value: string) {
    super();
  }
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

export class ASTTrue extends Visitable<ASTLiteralVisitor> {
  accept(visitor: ASTLiteralVisitor): void {
    visitor.visitTrue(this);
  }
}

export class ASTFalse extends Visitable<ASTLiteralVisitor> {
  accept(visitor: ASTLiteralVisitor): void {
    visitor.visitFalse(this);
  }
}

export class ASTNull extends Visitable<ASTLiteralVisitor> {
  accept(visitor: ASTLiteralVisitor): void {
    visitor.visitNull(this);
  }
}
