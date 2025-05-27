import { data } from "framer-motion/client";
import { dataService } from "./DataService";

type MapCallback = (term: string[]) => void;

class CategoryFilterService {
  private static instance: CategoryFilterService;
  private subscribers: Map<string, MapCallback> = new Map();
  private filterCategories: string[] = [];

  constructor() {
    this.filterCategories = dataService.getFilledCategories();
    dataService.subscribe(
      "categoryFilterService",
      this.updateFilterCategories.bind(this)
    );
  }

  clear() {
    this.filterCategories = dataService.getFilledCategories();
    this.notifySubscribers();
  }

  static getInstance(): CategoryFilterService {
    if (!CategoryFilterService.instance)
      CategoryFilterService.instance = new CategoryFilterService();
    return CategoryFilterService.instance;
  }

  subscribe(catName: string, callback: MapCallback): () => void {
    if (!this.subscribers.has(catName)) this.subscribers.set(catName, callback);
    return () => this.unsubscribe(catName);
  }

  unsubscribe(catName: string) {
    if (this.subscribers.has(catName)) this.subscribers.delete(catName);
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.filterCategories));
  }

  getFilterCategories(): string[] {
    return this.filterCategories;
  }

  updateFilterCategories() {
    this.filterCategories = dataService.getFilledCategories();
    this.notifySubscribers();
  }
}

export const categoryFilterService = CategoryFilterService.getInstance();
