import { dataService } from "./DataService";

type MapCallback = (term: Map<string, boolean>) => void;

class CategoryService {
  private static instance: CategoryService;
  private subscribers: Map<string, MapCallback> = new Map();
  private categories: Map<string, boolean> = new Map();

  constructor() {
    this.clear();
  }

  clear() {
    const storeCatalog = dataService.getStoreCatalog();
    storeCatalog.forEach((_, category) => {
      this.categories.set(category, true);
    });
    this.notifySubscribers();
  }

  static getInstance(): CategoryService {
    if (!CategoryService.instance)
      CategoryService.instance = new CategoryService();
    return CategoryService.instance;
  }

  subscribe(catName: string, callback: MapCallback): () => void {
    if (!this.subscribers.has(catName)) this.subscribers.set(catName, callback);
    return () => this.unsubscribe(catName);
  }

  unsubscribe(catName: string) {
    if (this.subscribers.has(catName)) this.subscribers.delete(catName);
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.categories));
  }

  getCategories(): Map<string, boolean> {
    return this.categories;
  }

  isCategoryVisible(category: string): boolean {
    return this.categories.get(category) ?? true;
  }

  setCategoryState(category: string, show?: boolean) {
    this.categories.set(
      category,
      show != undefined ? show : !this.categories.get(category)
    );
    this.notifySubscribers();
  }
}

export const categoryService = CategoryService.getInstance();
