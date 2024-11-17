import { Token } from '../lexing';
import { ASTFalse, ASTNull, ASTNumber, ASTString, ASTTrue } from './ast-literal';
import { ASTArray, ASTObject, ASTTree } from './ast-tree';

function createAncestor(token?: Token) {
  return token?.type === 'Equal' ? new ASTObject() : new ASTArray();
}

export class TreeParser {
  private readonly ancestors: ASTTree[] = [];
  private currentAncestor!: ASTTree;
  private index = 0;

  private constructor(private readonly tokens: Token[]) {}

  private parse() {
    let lastToken: Token;
    let token = this.tokens.at(0);
    while (token !== undefined) {
      switch (token.type) {
        case 'OpeningBracket':
          {
            const ancestor = createAncestor(this.tokens.at(this.index + 2));

            if (this.currentAncestor) {
              this.currentAncestor.append(ancestor);
              this.ancestors.unshift(this.currentAncestor);
            }

            this.currentAncestor = ancestor;
          }
          break;
        case 'ClosingBracket':
          const ancestor = this.ancestors.shift();
          if (ancestor) this.currentAncestor = ancestor;
          break;
        case 'Equal':
          if (this.currentAncestor instanceof ASTArray) {
            throw new Error(`Invalid token "=" at position ${token.pos}`);
          }
          break;
        case 'Comma':
          break;
        case 'String':
          this.currentAncestor.append(new ASTString(token.value));
          break;
        case 'Number':
          this.currentAncestor.append(new ASTNumber(token.value));
          break;
        case 'True':
          this.currentAncestor.append(new ASTTrue());
          break;
        case 'False':
          this.currentAncestor.append(new ASTFalse());
          break;
        case 'Null':
          this.currentAncestor.append(new ASTNull());
          break;
      }
      lastToken = token;
      token = this.tokens.at(++this.index);
    }

    return this.currentAncestor;
  }

  static parse(tokens: Token[]) {
    const parser = new TreeParser(tokens);
    return parser.parse();
  }
}
