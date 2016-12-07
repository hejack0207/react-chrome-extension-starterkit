export abstract class Message<T> {
  type: T;

  constructor(type: T) {
    this.type = type;
  }
}