import { ASTInterpreter, parseTree } from './ast';
import { handleError } from './error';
import { tokenGenerator } from './lexing';

export function parse(str: string) {
  try {
    const tokens = tokenGenerator(str);
    const tree = parseTree([...tokens]);
    return ASTInterpreter.interprete(tree);
  } catch (error) {
    handleError(error, str);
  }
}
