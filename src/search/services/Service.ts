export type VoidCallback = () => void;

export class Service {
  private subscribers: Map<string, VoidCallback> = new Map();

  protected constructor() {}

  subscribe(ID: string, callback: VoidCallback): () => void {
    this.subscribers.set(ID, callback);
    return () => this.unsubscribe(ID);
  }

  unsubscribe(ID: string) {
    this.subscribers.delete(ID);
  }

  protected notifySubscribers() {
    if (this.subscribers.size === 0) return;
    this.subscribers.forEach((callback) => callback());
  }
}
