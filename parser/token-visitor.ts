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
   
export interface TrueVisitor{
  visitTrue():void;
}

export interface FalseVisitor{
  visitFalse(): void;
}
  
export interface NumberVisitor{
  visitNumber(value:string):void;
}
  
export interface NullVisitor{
  visitNull():void;
}
  
export type TokenVisitor = 
    | OpeningBracketVisitor
    | ClosingBracketVisitor
    | CommaVisitor
    | EqualVisitor
    | StringVisitor
    | NumberVisitor
    | TrueVisitor
    | FalseVisitor
    | NullVisitor

export type Intersect<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never;
  
export abstract class DefaultTokenVisitor implements Intersect<TokenVisitor>{
  visitOpeningBracket(): void {
    this.defaultVisitHandler();
  }

  visitClosingBracket(): void {
    this.defaultVisitHandler();
  }

  visitComma(): void {
    this.defaultVisitHandler();
  }

  visitEqual(): void {
    this.defaultVisitHandler();
  }

  visitString(value: string): void {
    this.defaultVisitHandler();
  }

  visitTrue(): void {
    this.defaultVisitHandler();
  }

  visitFalse(): void {
    this.defaultVisitHandler();
  }

  visitNumber(value: string): void {
    this.defaultVisitHandler();
  }

  visitNull(): void {
    this.defaultVisitHandler();
  }

  protected abstract defaultVisitHandler(): void;
}