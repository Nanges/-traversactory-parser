import { ASTNodeVisitor } from "./ast-node-visitor";
import { Visitable } from "./visitable";

export type ASTNodeAssertion = Partial<Record<'isObject'|'isArray'|'isProperty'|'isString'|'isTrue'|'isFalse'|'isNull'|'isNumber'|'', boolean>>;

export class ASTNodeAssert implements ASTNodeVisitor{
    private result:boolean = false;

    static is(node: Visitable<ASTNodeVisitor>, assert:ASTNodeAssertion){
        const visitor = new ASTNodeAssert(assert);
        node.accept(visitor);
        return visitor.result;
    }

    /**
     *
     */
    private constructor(private readonly assertions: ASTNodeAssertion) {}

    visitObject(): void {
        this.result = Boolean(this.assertions.isObject);
    }

    visitArray(): void {
        this.result = Boolean(this.assertions.isArray);
    }

    visitProperty(): void {
        this.result = Boolean(this.assertions.isProperty);
    }

    visitString(): void {
        this.result = Boolean(this.assertions.isString);
    }

    visitTrue(): void {
        this.result = Boolean(this.assertions.isTrue);
    }

    visitFalse(): void {
        this.result = Boolean(this.assertions.isFalse);
    }

    visitNull(): void {
        this.result = Boolean(this.assertions.isNull);
    }

    visitNumber(): void {
        this.result = Boolean(this.assertions.isNumber);
    }
}