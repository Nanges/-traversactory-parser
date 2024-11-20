import { Token } from '../lexing';

export function validate(tokens: Token[]): void {
  if (tokens.at(0)?.type !== 'OpeningBracket') {
    throw new Error('Unexpected start of input. "(" expected');
  }

  if (tokens.at(-1)?.type !== 'ClosingBracket') {
    throw new Error('Unexpected end of input. ")" expected');
  }
}
