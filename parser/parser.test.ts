import { parse } from './parser';

describe('Parser', () => {
  test('Parse string: (foo=bar,pos=(x=4,y=5))', () => {
    const str = parse('(foo=bar,pos=(x=4,y=5))');
    expect(str).toEqual({ foo: 'bar', pos: { x: 4, y: 5 } });
  });
});
