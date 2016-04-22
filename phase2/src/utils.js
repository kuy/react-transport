export const seqId = (() => {
  let n = 0;
  return () => n++;
})();

// NOTE: Doesn't support pull() from multiple consumers.
export class Queue {
  constructor() {
    this.queue = [];
    this.resolve = null;
  }

  push(obj) {
    this.queue.push(obj);

    if (this.resolve) {
      this.resolve(this.queue.shift());
      this.resolve = null;
    }
  }

  pull() {
    return new Promise(resolve => {
      if (0 < this.queue.length) {
        const obj = this.queue.shift();
        resolve(obj);
      } else {
        this.resolve = resolve;
      }
    });
  }
}

