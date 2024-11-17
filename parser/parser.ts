import { ASTInterpreter } from './interpreter';
import { tokenGenerator } from './token-generator';
import { TreeParser } from './tree-parser';

export function parse(str: string) {
  const tokens = tokenGenerator(str);
  const tree = TreeParser.parse([...tokens]);
  return ASTInterpreter.interprete(tree);
}
