import { createToken, Token } from "./token";

enum DELIMITER {
  OPENING_BRACKET = "(",
  CLOSING_BRACKET = ")",
  EQUAL = "=",
  DOUBLE_QUOTE = '"',
  COMMA = ","
}

function extractString(baseStr:string, cursor:number):[string, number]{
    let result:string = "";
    let char = baseStr.at(cursor);
  
    while(char && char !== DELIMITER.DOUBLE_QUOTE){
      result += char;
      char = baseStr.at(++cursor);
    }
  
    return [result, ++cursor];
}

function extractLiteral(str: string, cursor:number):[string, number]{
  let word = "";
  let char = str.at(cursor);

  while(char && /[\d\.\w\-]/.test(char)){
    word += char;
    char = str.at(++cursor);
  }

  return [word, cursor];
}
  
function tokenizeLiteral(value:string): Token{
    if(!isNaN(Number(value))) return createToken('Number', value);
  
    const lower = value.toLowerCase();

    switch(lower){
      case 'true':
        return createToken('True');
      case 'false':
        return createToken('False');
      case 'null':
        return createToken('Null');
    }

    return createToken('String', value);
}
  
export function tokenize(str:string) {
    let cursor = 0;
    let char = str.at(cursor);
    const tokens: Token[] = [];
  
    while(char !== undefined) {
      switch(char){
        case DELIMITER.OPENING_BRACKET:
          tokens.push(createToken('OpeningBracket'));
          cursor++;
        break;
        case DELIMITER.CLOSING_BRACKET:
          tokens.push(createToken('ClosingBracket'));
          cursor++;
        break;
        case DELIMITER.COMMA:
          tokens.push(createToken('Comma'));
          cursor++;
        break;
        case DELIMITER.EQUAL:
          tokens.push(createToken('Equal'));
          cursor++;
        break;
        case DELIMITER.DOUBLE_QUOTE: {
          const [value, newCursor] = extractString(str, ++cursor);  
          tokens.push(createToken('String',value));
          cursor = newCursor;
        }
        break;
        default:{
          // Ignore space
          if(/\s/.test(char)){
            cursor++;
          }
          // Literals
          else {
            const [word, newCursor] = extractLiteral(str, cursor);

            if(!word.length) throw new Error(`Unknown character: ${char}`);

            tokens.push(tokenizeLiteral(word));
            cursor = newCursor;
          }
        }
      }

      char = str.at(cursor);
    }
  
    return tokens;
}