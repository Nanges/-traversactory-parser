export interface OpeningBracketVisitor{
  visitOpeningBracket():void;
}
  
export interface ClosingBracketVisitor{
  visitClosingBracket():void;
}

export interface CommaVisitor{
  visitComma(): void;
}

export interface EqualVisitor{
  visitEqual(): void;
}

export interface StringVisitor{
  visitString(value:string):void;
}

export interface NumberVisitor{
  visitNumber(value:string):void;
}
   
export interface TrueVisitor{
  visitTrue():void;
}

export interface FalseVisitor{
  visitFalse(): void;
}
  
export interface NullVisitor{
  visitNull():void;
}