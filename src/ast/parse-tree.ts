import { TokenError } from '../error/token-error';
import { Token } from '../lexing';
import { ASTFalse, ASTNull, ASTNumber, ASTString, ASTTrue } from './ast-literal';
import { ASTArray, ASTNode, ASTObject } from './ast-tree';

function createNode(token?: Token) {
  return token?.type === 'Equal' ? new ASTObject() : new ASTArray();
}

export function parseTree(tokens: Token[]) {
  const ancestors: ASTNode[] = [];
  let currentNode: ASTNode | undefined;
  let result!: ASTNode;
  let index = 0;
  const ln = tokens.length;
  let token = tokens.at(index);

  if (token?.type === 'OpeningBracket') {
    currentNode = createNode(tokens.at(index + 2));
    result = currentNode;

    ++index;

    while (index < ln) {
      if (!currentNode) throw new TokenError(token);
      token = tokens[index];

      switch (token.type) {
        case 'OpeningBracket':
          ancestors.unshift(currentNode);
          const newNode = createNode(tokens.at(index + 2));
          currentNode.append(newNode);
          currentNode = newNode;
          break;
        case 'ClosingBracket':
          currentNode = ancestors.shift();
          break;
        case 'Equal':
          if (currentNode instanceof ASTArray) {
            throw new TokenError(token);
          }
          break;
        case 'Comma':
          const next = tokens.at(index + 1);
          if (next && next?.type === 'Equal') {
            throw new TokenError(next);
          }
          break;
        case 'String':
          currentNode.append(new ASTString(token.value));
          break;
        case 'Number':
          currentNode.append(new ASTNumber(token.value));
          break;
        case 'True':
          currentNode.append(new ASTTrue());
          break;
        case 'False':
          currentNode.append(new ASTFalse());
          break;
        case 'Null':
          currentNode.append(new ASTNull());
          break;
      }

      ++index;
    }

    if (token?.type !== 'ClosingBracket') throw new Error('Unexpected end of input. ")" expected');
    return result;
  }

  throw new Error('Unexpected start of input. "(" expected');
}
