import { Visitable } from '../utils/visitable';

export interface ASTObjectVisitor {
  visitObject(o: Visitable<ASTObjectVisitor>): void;
}

export interface ASTArrayVisitor {
  visitArray(o: Visitable<ASTArrayVisitor>): void;
}

export type ASTNodeVisitor = ASTObjectVisitor & ASTArrayVisitor;

export interface ASTLiteralVisitor {
  visitString(o: Visitable<ASTLiteralVisitor>): void;
  visitTrue(o: Visitable<ASTLiteralVisitor>): void;
  visitFalse(o: Visitable<ASTLiteralVisitor>): void;
  visitNull(o: Visitable<ASTLiteralVisitor>): void;
  visitNumber(o: Visitable<ASTLiteralVisitor>): void;
}

export type ASTVisitor = ASTNodeVisitor & ASTLiteralVisitor;
