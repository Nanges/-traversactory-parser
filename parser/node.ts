import { ASTNodeVisitor } from "./ast-node-visitor";
import { Visitable } from "./visitable";

export abstract class ASTNode<T = any> extends Visitable<ASTNodeVisitor>{
    protected _value!: T;

    get value():T{
        return this._value;
    }
}

export abstract class ASTCompositeNode<T = any> extends ASTNode<T> {
    abstract append(value: ASTNode): void;
}

export class ASTProperty extends ASTCompositeNode<ASTNode>{
    constructor(readonly key: string) {
        super();
    }

    append(value: ASTNode): void {
        this._value = value;
    }

    accept(v: ASTNodeVisitor): void {
        v.visitProperty(this);
    }
}

export class ASTObject extends ASTCompositeNode<ASTProperty[]>{
    constructor() {
        super();
        this._value = [];
    }

    append(value: ASTProperty) {
        return this.value.push(value);
    }

    accept(v: ASTNodeVisitor): void {
        v.visitObject(this);
    }
}

export class ASTArray extends ASTCompositeNode<ASTNode[]>{

    constructor() {
        super();
        this._value = [];
    }

    append(value: ASTNode) {
        this.value.push(value);
    }

    accept(v: ASTNodeVisitor): void {
        v.visitArray(this);
    }
}

export class ASTString extends ASTNode<string>{
    constructor(value: string) { 
        super();
        this._value = value;
    }

    accept(visitor: ASTNodeVisitor): void {
        visitor.visitString(this);
    }
}


export class ASTNumber extends ASTString{
    accept(visitor: ASTNodeVisitor): void {
        visitor.visitNumber(this);
    }
}

export class ASTTrue extends ASTNode {
    accept(visitor: ASTNodeVisitor): void {
        visitor.visitTrue(this);
    }
}

export class ASTFalse extends ASTNode {
    accept(visitor: ASTNodeVisitor): void {
        visitor.visitFalse(this);
    }
}

export class ASTNull extends ASTNode {
    accept(visitor: ASTNodeVisitor): void {
        visitor.visitNull(this);
    }
}