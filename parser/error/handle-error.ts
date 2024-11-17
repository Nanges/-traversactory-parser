import { PositionError } from './position-error';

export function handleError(error: any, str: string) {
  if (error instanceof PositionError) {
    const pos = error.position;
    let message = `Invalid token at position: ${pos}\r`;
    message += `\n${locate(pos, str)}`;
    throw new Error(message);
  }

  throw error;
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
