import { ASTNodeAssert } from "./ast-node-assert";
import { ASTInterpreter } from "./interpreter";
import { ASTArray, ASTCompositeNode, ASTFalse, ASTNull, ASTNumber, ASTObject, ASTProperty, ASTString, ASTTrue } from "./node";
import {  Token } from "./token";
import { tokenize } from "./tokenize";

function isEqualToken(tokens:Token[], pos:number){
    const token = tokens.at(pos);
    return token && token.type === 'Equal';
}

function createSubtree(tokens:Token[], pos:number){
    return isEqualToken(tokens, pos + 2)
        ? new ASTObject
        : new ASTArray;
}

function parseTree(tokens: Token[]){
    let cursor = 0;
    let tree!: ASTCompositeNode;
    const ancestors: ASTCompositeNode[] = [];

    function shift(){
        const shift = ancestors.shift();
        if(shift) tree = shift;
    }

    while(cursor < tokens.length){
        const token = tokens.at(cursor);    
        switch(token?.type){
            case 'OpeningBracket':{
                const subtree = createSubtree(tokens, cursor);

                if(tree){
                    ancestors.unshift(tree);
                    tree.append(subtree);
                }

                tree = subtree;
            }
            break;
            case 'ClosingBracket': {
                // If last property double shift
                if(ASTNodeAssert.is(tree, {isProperty:true})){
                    shift();
                }

                shift();
            }
            break;
            case 'Comma':
                if(ASTNodeAssert.is(tree, {isProperty:true})){
                    shift();
                }
            break;
            case 'Number': tree.append(new ASTNumber(token.value));
            break;
            case 'String':{
                if(ASTNodeAssert.is(tree, {isObject:true})){
                    const property = new ASTProperty(token.value);
                    tree.append(property);
                    ancestors.unshift(tree);
                    tree = property;
                }
                else{
                    tree.append(new ASTString(token.value));
                }
            }
            break;
            case 'True':
                tree.append(new ASTTrue);
            break;
            case 'False':{
                tree.append(new ASTFalse);
            }
            break;
            case 'Null':{
                tree.append(new ASTNull);
            }
            break;
        }

        cursor++;
    }

    return tree;
}

export function parse(str:string){
    const tokens = tokenize(str);
    const tree = parseTree(tokens);
    return ASTInterpreter.interprete(tree);
}