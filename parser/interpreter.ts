import { ASTNodeVisitor } from "./ast-node-visitor";
import { ASTArray, ASTCompositeNode, ASTNode, ASTNumber, ASTObject, ASTProperty, ASTString } from "./node";
import { Visitable } from "./visitable";

export class ASTInterpreter implements ASTNodeVisitor{
    private currentValue:any;

    static interprete(node: ASTNode){
        const visitor = new ASTInterpreter();
        node.accept(visitor);
        return visitor.currentValue;
    }

    private constructor(){}

    visitObject(o: ASTObject): void {
        const obj:any = {};

        for(const property of o.value){
            property.value.accept(this);
            obj[property.key] = this.currentValue;
        }

        this.currentValue = obj;
    }

    visitArray(o: ASTArray): void {
        const items = [];
        for(const item of o.value){
            item.accept(this);
            items.push(this.currentValue);
        }

        this.currentValue = items;
    }

    visitProperty(o: ASTProperty): void {}

    visitString(o: ASTString): void {
        this.currentValue = o.value;
    }

    visitTrue(): void {
        this.currentValue = true;
    }

    visitFalse(o: Visitable<ASTNodeVisitor>): void {
        this.currentValue = false;
    }

    visitNull(o: Visitable<ASTNodeVisitor>): void {
        this.currentValue = null;
    }

    visitNumber(o: ASTNumber): void {
        this.currentValue = Number(o.value)
    }
}