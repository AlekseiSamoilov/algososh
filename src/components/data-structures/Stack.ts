class Stack<T> {
  private items: T[] = [];

  constructor() {
    this.items = [];
  }

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
  clear(): void {
    this.items = [];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getItems(): T[] {
    return this.items;
  }
}

export default Stack;
