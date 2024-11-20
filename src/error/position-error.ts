export class PositionError extends Error {
  constructor(position: number, str: string) {
    super(positionErrorMessage(position, str));
  }
}

function positionErrorMessage(pos: number, str: string) {
  let message = `Invalid token at position: ${pos}\r`;
  message += `\n${locate(pos, str)}`;
  return message;
}

function locate(pos: number, str: string, padding = 5) {
  const cursor = createCursor(pos < padding ? pos : padding);
  return `${str.substring(pos - padding, pos + padding)}\r\n${cursor}`;
}

function createCursor(pos: number) {
  let cursor = '^';
  while (pos-- > 0) cursor = `\u0020${cursor}`;
  return cursor;
}
