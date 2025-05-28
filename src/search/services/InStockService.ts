import { Service } from "./Service";

class InStockService extends Service {
  private static instance: InStockService;
  private inStock: boolean = false;

  constructor() {
    super();
  }

  clear() {
    this.inStock = false;
    this.notifySubscribers();
  }

  static getInstance(): InStockService {
    if (!InStockService.instance)
      InStockService.instance = new InStockService();
    return InStockService.instance;
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
