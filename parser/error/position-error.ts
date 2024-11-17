export class PositionError extends Error {
  constructor(readonly position: number) {
    super();
  }
}
