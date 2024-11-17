import { ASTInterpreter, parseTree, ReviverFn } from './ast';
import { handleError } from './error';
import { tokenGenerator } from './lexing';

export function parse(str: string, reviver?: ReviverFn) {
  try {
    const tokens = Array.from(tokenGenerator(str));
    const tree = parseTree(tokens);
    return ASTInterpreter.interprete(tree, reviver);
  } catch (error) {
    handleError(error, str);
  }
}
