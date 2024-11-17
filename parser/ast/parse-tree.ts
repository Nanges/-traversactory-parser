import { PositionError } from '../error/position-error';
import { Token } from '../lexing';
import { ASTFalse, ASTNull, ASTNumber, ASTString, ASTTrue } from './ast-literal';
import { ASTArray, ASTObject, ASTTree } from './ast-tree';

function createAncestor(token?: Token) {
  return token?.type === 'Equal' ? new ASTObject() : new ASTArray();
}

export function parseTree(tokens: Token[]) {
  const ancestors: ASTTree[] = [];
  let currentAncestor!: ASTTree;
  let index = 0;
  let token = tokens.at(index);

  while (token != undefined) {
    if (token.type === 'OpeningBracket') {
      const ancestor = createAncestor(tokens.at(index + 2));

      if (currentAncestor) {
        currentAncestor.append(ancestor);
        ancestors.unshift(currentAncestor);
      }

      currentAncestor = ancestor;
      token = tokens.at(++index);
    } else if (!currentAncestor) {
      throw new PositionError(token.pos);
    } else {
      switch (token.type) {
        case 'ClosingBracket':
          const ancestor = ancestors.shift();
          if (ancestor) currentAncestor = ancestor;
          break;
        case 'Equal':
          if (currentAncestor instanceof ASTArray) {
            throw new PositionError(token.pos);
          }
          break;
        case 'Comma':
          break;
        case 'String':
          currentAncestor.append(new ASTString(token.value));
          break;
        case 'Number':
          currentAncestor.append(new ASTNumber(token.value));
          break;
        case 'True':
          currentAncestor.append(new ASTTrue());
          break;
        case 'False':
          currentAncestor.append(new ASTFalse());
          break;
        case 'Null':
          currentAncestor.append(new ASTNull());
          break;
      }

      token = tokens.at(++index);
    }
  }

  return currentAncestor;
}
