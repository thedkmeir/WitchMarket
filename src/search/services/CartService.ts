import { dataService } from "./DataService";

type MapCallback = (term: Map<string, number>) => void;

class CartService {
  private static instance: CartService;
  private subscribers: MapCallback[] = [];
  private itemList: Map<string, number> = new Map();
  private totalCost: number = 0;

  constructor() {}

  clear() {
    this.itemList.clear();
    this.notifySubscribers();
  }

  static getInstance(): CartService {
    if (!CartService.instance) CartService.instance = new CartService();
    return CartService.instance;
  }

  subscribe(callback: MapCallback): () => void {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: MapCallback) {
    this.subscribers = this.subscribers.filter((cb) => cb !== callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(new Map(this.itemList)));
  }

  getCart(): Map<string, number> {
    return new Map(this.itemList);
  }

  addItem(itemName: string) {
    this.totalCost += dataService.getProductByName(itemName)?.price || 0;
    const currentAmount = this.itemList.get(itemName) || 0;
    this.itemList.set(itemName, currentAmount + 1);
    this.notifySubscribers();
  }

  removeItem(itemName: string) {
    if (this.itemList.has(itemName)) {
      this.totalCost -=
        (dataService.getProductByName(itemName)?.price || 0) *
        this.itemList.get(itemName)!;
      this.itemList.delete(itemName);
      this.notifySubscribers();
    }
  }

  decreaseItem(itemName: string, amount: number = 1) {
    const currentAmount = this.itemList.get(itemName) || 0;
    const newAmount = currentAmount - amount;

    if (newAmount > 0) {
      this.itemList.set(itemName, newAmount);
    } else {
      this.itemList.delete(itemName);
    }

    this.totalCost -=
      (dataService.getProductByName(itemName)?.price || 0) * amount;

    this.notifySubscribers();
  }

  updateAmount(itemName: string, amount: number) {
    const currentAmount = this.itemList.get(itemName) || 0;
    const diff = amount - currentAmount;
    if (amount > 0) {
      this.itemList.set(itemName, amount);
      this.totalCost +=
        (dataService.getProductByName(itemName)?.price || 0) * diff;
    } else {
      this.totalCost +=
        (dataService.getProductByName(itemName)?.price || 0) * currentAmount;
      this.itemList.delete(itemName);
    }

    this.notifySubscribers();
  }

  getTotalCost(): number {
    return this.totalCost;
  }
}

export const cartService = CartService.getInstance();
