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
});
