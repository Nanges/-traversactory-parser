type BaseToken<T> = {
  type: T;
  pos: number;
};

type NoValueToken = BaseToken<'ClosingBracket' | 'OpeningBracket' | 'Equal' | 'Comma' | 'False' | 'True' | 'Null'>;
type ValueToken = BaseToken<'Number' | 'String'> & { value: string };
export type Token = NoValueToken | ValueToken;

export function createToken(pos: number, type: NoValueToken['type']): NoValueToken;
export function createToken(pos: number, type: ValueToken['type'], value: string): ValueToken;
export function createToken(pos: number, type: Token['type'], value?: string): Partial<Token> {
  return { pos, type, value };
}
