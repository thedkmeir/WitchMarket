import { dataService } from "./DataService";
import { Service } from "./Service";

class CartService extends Service {
  private static instance: CartService;
  static getInstance(): CartService {
    if (!CartService.instance) CartService.instance = new CartService();
    return CartService.instance;
  }

  private itemList: Map<string, number> = new Map();
  private totalCost: number = 0;

  constructor() {
    super();
  }

  clear() {
    this.itemList.clear();
    this.totalCost = 0;
    this.notifySubscribers();
  }

  getCart(): Map<string, number> {
    return new Map(this.itemList);
  }

  addItem(itemName: string) {
    this.totalCost += dataService.getProductByName(itemName)?.price || 0;
    const currentAmount = this.itemList.get(itemName) || 0;
    this.itemList.set(itemName, currentAmount + 1);
    this.fixTotalCount();
    this.notifySubscribers();
  }

  removeItem(itemName: string) {
    if (this.itemList.has(itemName)) {
      this.totalCost -=
        (dataService.getProductByName(itemName)?.price || 0) *
        this.itemList.get(itemName)!;
      this.itemList.delete(itemName);
      this.fixTotalCount();
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
    this.fixTotalCount();
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
    this.fixTotalCount();
    this.notifySubscribers();
  }

  getTotalCost(): number {
    if (localStorage.getItem("isOwner") === "true") return 0; // If the user is the owner, the total cost is 0
    return this.totalCost;
  }

  getUniqueItemsCount(): number {
    return this.itemList.size;
  }

  getUniqueItems(): string[] {
    return Array.from(this.itemList.keys());
  }

  isCartEmpty(): boolean {
    return this.itemList.size === 0;
  }

  private fixTotalCount() {
    this.totalCost = Math.round((this.totalCost + Number.EPSILON) * 100) / 100;
  }
}

export const cartService = CartService.getInstance();
