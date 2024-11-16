import { Visitable } from "./visitable";

export interface ASTNodeVisitor{
    visitObject(o: Visitable<ASTNodeVisitor>): void;
    visitArray(o: Visitable<ASTNodeVisitor>): void;
    visitProperty(o: Visitable<ASTNodeVisitor>): void;
    visitString(o: Visitable<ASTNodeVisitor>): void;
    visitTrue(o: Visitable<ASTNodeVisitor>): void;
    visitFalse(o: Visitable<ASTNodeVisitor>): void;
    visitNull(o: Visitable<ASTNodeVisitor>): void;
    visitNumber(o: Visitable<ASTNodeVisitor>): void;
}