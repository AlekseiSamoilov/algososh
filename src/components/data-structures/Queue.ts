class Queue<T> {
  private items: T[] = [];
  private deletedCount: number = 0;

  constructor() {
    this.items = [];
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    const item = this.items.shift();
    if (item !== undefined) {
      this.deletedCount++;
    }
    return item;
  }

  clear(): void {
    this.items = [];
    this.deletedCount = 0;
  }

  getDeletedCount(): number {
    return this.deletedCount;
  }

  getItems(): T[] {
    return this.items;
  }
}

export default Queue;
