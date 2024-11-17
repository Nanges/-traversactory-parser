import { parse } from './parser/parse';

const obj = parse('(foo=(5,7))');
console.log(obj);
