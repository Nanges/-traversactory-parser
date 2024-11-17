export abstract class Visitable<T>{
    abstract accept(visitor:T): void;
}