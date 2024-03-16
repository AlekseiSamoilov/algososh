import { ElementStates } from "../../types/element-states";

class ListElement<T> {
  public value: T;
  public next: ListElement<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  private deleteCount: number = 0;
  private addCount: number = 0;
  private count: number = 0;
  private head: ListElement<T> | null = null;
  get size(): number {
    return this.count;
  }
  append(value: T): void {
    const newElement = new ListElement(value);
    if (this.head === null) {
      this.head = newElement;
      this.count++;
      return;
    }
    let element = this.head;
    while (element.next !== null) {
      element = element.next;
    }
    element.next = newElement;
    this.count++;
  }

  prepend(value: T): void {
    const newElement = new ListElement(value);
    newElement.next = this.head;
    this.head = newElement;
    this.count++;
    this.addCount++;
  }

  deleteHead(): void {
    if (!this.head) return;
    this.head = this.head.next;
    this.count--;
    this.deleteCount++;
  }

  deleteTail(): void {
    if (!this.head) return;
    if (!this.head.next) {
      this.head = null;
    } else {
      let current = this.head;
      while (current.next && current.next.next) {
        current = current.next;
      }
      current.next = null;
    }
    this.count--;
    this.deleteCount++;
  }

  insertAt(value: T, index: number): void {
    if (index < 0 || index > this.size) return;
    if (index === 0) {
      this.prepend(value);
      return;
    }
    const newNode = new ListElement(value);
    let current = this.head;
    let previous = null;
    let i = 0;

    while (i < index) {
      previous = current;
      current = current!.next;
      i++;
    }

    newNode.next = current;
    if (previous) previous.next = newNode;
    this.count++;
    this.addCount++;
  }

  deleteAt(index: number): void {
    if (index < 0 || index >= this.size || !this.head) return;

    if (index === 0) {
      this.head = this.head.next;
    } else {
      let current: ListElement<T> | null = this.head;
      let previous: ListElement<T> | null = null;
      let i = 0;

      while (i < index) {
        previous = current;
        current = current!.next;
        i++;
      }

      if (previous) previous.next = current!.next;
    }
    this.count--;
    this.deleteCount++;
  }

  toArray(): T[] {
    let arr: T[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  getSize(): number {
    return this.size;
  }
}

export default LinkedList;
