import { parse } from './parse';

describe('parse()', () => {
  test('Parse Object: (foo=bar,bar=baz)', () => {
    const str = parse('(foo=bar,bar=baz)');
    expect(str).toEqual({ foo: 'bar', bar: 'baz' });
  });

  test('Parse Object: (foo="école",bar="élève")', () => {
    const str = parse('(foo="école",bar="élève")');
    expect(str).toEqual({ foo: 'école', bar: 'élève' });
  });

  test('Parse Object: (foo=(x=4,y=False,z=Null))', () => {
    const str = parse('(foo=(x=4,y=False,z=Null))');
    expect(str).toEqual({ foo: { x: 4, y: false, z: null } });
  });

  test('Parse Array: (foo,bar,baz)', () => {
    const str = parse('(foo,bar,baz)');
    expect(str).toEqual(['foo', 'bar', 'baz']);
  });

  test('Parse Array: ((foo,bar),baz)', () => {
    const str = parse('((foo,bar),baz)');
    expect(str).toEqual([['foo', 'bar'], 'baz']);
  });

  test('Parse Array: ()', () => {
    const str = parse('()');
    expect(str).toEqual([]);
  });

  test('Should throw with: foo{dssssdsdvfv', () => {
    expect(parse.bind(null, 'foo{dssssdsdvfv')).toThrow();
  });

  test('Should throw with: =', () => {
    expect(parse.bind(null, '=')).toThrow();
  });

  test('Should throw with empty string', () => {
    expect(parse.bind(null, '')).toThrow('Unexpected start of input');
  });

  test('Should throw with unepexcted start', () => {
    expect(parse.bind(null, ')')).toThrow('Unexpected start of input');
  });

  test('Should throw with unepexcted end', () => {
    expect(parse.bind(null, '(')).toThrow('Unexpected end of input');
  });
});

describe('Parse with reviver', () => {
  test('Parse array (1,2,3) => [2,4,6]', () => {
    const reviver = (v: number) => v * 2;
    expect(parse('(1,2,3)', reviver)).toEqual([2, 4, 6]);
  });

  test('Parse array (1,2,3) => [2,2,6]', () => {
    const reviver = (v: number, [index]: (string | number)[]) => {
      if ((index as number) % 2 === 0) {
        return v * 2;
      }
      return v;
    };
    expect(parse('(1,2,3)', reviver)).toEqual([2, 2, 6]);
  });

  test('Parse Object (foo=(1,2,3), bar=(1,2,3)) => {foo:[1,2,3],bar:[2,4,6]}', () => {
    const reviver = (v: number, path: (string | number)[]) => {
      if (path.at(0) === 'bar' && typeof path.at(1) === 'number') {
        return v * 2;
      }
      return v;
    };
    expect(parse('(foo=(1,2,3), bar=(1,2,3))', reviver)).toEqual({ foo: [1, 2, 3], bar: [2, 4, 6] });
  });
});
