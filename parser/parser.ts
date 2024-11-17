import { ASTInterpreter, TreeParser } from './ast';
import { tokenGenerator } from './lexing';

export function parse(str: string) {
  const tokens = tokenGenerator(str);
  const tree = TreeParser.parse([...tokens]);
  return ASTInterpreter.interprete(tree);
}
