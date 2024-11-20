import { ASTInterpreter, parseTree, ReviverFn } from './ast';
import { PositionError } from './error';
import { TokenError } from './error/token-error';
import { tokenGenerator } from './lexing';

export function parse(str: string, reviver?: ReviverFn) {
  try {
    const tokens = Array.from(tokenGenerator(str));
    const tree = parseTree(tokens);
    const result = ASTInterpreter.interprete(tree, reviver);
    return result;
  } catch (error) {
    if (error instanceof TokenError) {
      throw new PositionError(error.token.pos, str);
    }

    throw error;
  }
}
