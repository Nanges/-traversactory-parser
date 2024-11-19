export interface Visitable<T> {
  accept(visitor: T): void;
}
