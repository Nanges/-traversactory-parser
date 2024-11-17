import { createToken, Token } from './token';

enum DELIMITER {
  OPENING_BRACKET = '(',
  CLOSING_BRACKET = ')',
  EQUAL = '=',
  DOUBLE_QUOTE = '"',
  COMMA = ',',
}

function extractLiteral(str: string, cursor: number, predicate: (char: string) => boolean): [string, number] {
  let literal: string = '';
  let char = str.at(cursor);

  while (char && predicate(char)) {
    literal += char;
    char = str.at(++cursor);
  }

  return [literal, cursor];
}

function tokenizeLiteral(value: string, cursor: number): Token {
  if (!isNaN(Number(value))) return createToken(cursor, 'Number', value);

  const lower = value.toLowerCase();

  switch (lower) {
    case 'true':
      return createToken(cursor, 'True');
    case 'false':
      return createToken(cursor, 'False');
    case 'null':
      return createToken(cursor, 'Null');
  }

  return createToken(cursor, 'String', value);
}

export function* tokenGenerator(str: string) {
  let cursor = 0;
  let char = str.at(cursor);

  while (char !== undefined) {
    switch (char) {
      case DELIMITER.OPENING_BRACKET:
        yield createToken(cursor, 'OpeningBracket');
        cursor++;
        break;
      case DELIMITER.CLOSING_BRACKET:
        yield createToken(cursor, 'ClosingBracket');
        cursor++;
        break;
      case DELIMITER.COMMA:
        yield createToken(cursor, 'Comma');
        cursor++;
        break;
      case DELIMITER.EQUAL:
        yield createToken(cursor, 'Equal');
        cursor++;
        break;
      case DELIMITER.DOUBLE_QUOTE:
        {
          const [value, newCursor] = extractLiteral(str, ++cursor, (c) => c !== DELIMITER.DOUBLE_QUOTE);
          cursor = newCursor + 1;
          yield createToken(cursor, 'String', value);
        }
        break;
      default: {
        // Ignore space
        if (/\s/.test(char)) {
          cursor++;
        }
        // Literals
        else {
          const [word, newCursor] = extractLiteral(str, cursor, (c) => /[\d\.\w\-]/.test(c));
          if (!word.length) throw new Error(`Tokenizing error: Invalid character "${char}" at position: ${cursor}`);
          yield tokenizeLiteral(word, cursor);
          cursor = newCursor;
        }
      }
    }

    char = str.at(cursor);
  }
}
