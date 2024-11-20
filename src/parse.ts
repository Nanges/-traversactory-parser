import { ASTInterpreter, parseTree, ReviverFn } from './ast';
import { tokenGenerator } from './lexing';
import { validate } from './validation';

export function parse(str: string, reviver?: ReviverFn) {
  const tokens = Array.from(tokenGenerator(str));
  validate(tokens);
  const tree = parseTree(tokens);
  return ASTInterpreter.interprete(tree, reviver);
}
