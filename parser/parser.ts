import { TreeParser } from './ast';
import { ASTInterpreter } from './ast/interpreter';
import { tokenGenerator } from './lexing';

export function parse(str: string) {
  const tokens = tokenGenerator(str);
  const tree = TreeParser.parse([...tokens]);
  return ASTInterpreter.interprete(tree);
}
