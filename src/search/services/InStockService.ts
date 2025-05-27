type BooleanCallback = (term: boolean) => void;

class InStockService {
  private static instance: InStockService;
  private subscribers: BooleanCallback[] = [];
  private inStock: boolean = false;

  constructor() {}

  clear() {
    this.inStock = false;
    this.notifySubscribers();
  }

  static getInstance(): InStockService {
    if (!InStockService.instance)
      InStockService.instance = new InStockService();
    return InStockService.instance;
  }

  subscribe(callback: BooleanCallback): () => void {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: BooleanCallback) {
    this.subscribers = this.subscribers.filter((cb) => cb !== callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.inStock));
  }

  getInStock(): boolean {
    return this.inStock;
  }

  setInStock(val?: boolean) {
    if (val === undefined) this.inStock = !this.inStock;
    else this.inStock = val;
    this.notifySubscribers();
  }
}

export const inStockService = InStockService.getInstance();
