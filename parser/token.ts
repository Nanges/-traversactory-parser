type BaseToken<T> = {
  type: T;
}

type NoValueToken = BaseToken<'ClosingBracket' | 'Comma' | 'OpeningBracket' | 'Equal' | 'False' | 'True' | 'Null'>;
type ValueToken = BaseToken<'Number' | 'String'> & {value: string};
export type Token = NoValueToken | ValueToken;

export function createToken(type:NoValueToken['type']): NoValueToken;
export function createToken(type:ValueToken['type'], value:string): ValueToken;
export function createToken(type:Token['type'], value?:string): Partial<Token>{
  return {type, value};
}