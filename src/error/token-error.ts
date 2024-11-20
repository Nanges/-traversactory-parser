import { Token } from '../lexing';

export class TokenError extends Error {
  /**
   *
   */
  constructor(readonly token: Token) {
    super();
  }
}
