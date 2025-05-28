import { dataService } from "./DataService";
import { Service } from "./Service";

class CategoryService extends Service {
  private static instance: CategoryService;
  static getInstance(): CategoryService {
    if (!CategoryService.instance)
      CategoryService.instance = new CategoryService();
    return CategoryService.instance;
  }

  private categories: Map<string, boolean> = new Map();

  constructor() {
    super();
    this.clear();
  }

  clear() {
    const storeCatalog = dataService.getStoreCatalog();
    storeCatalog.forEach((_, category) => {
      this.categories.set(category, true);
    });
    dataService.clearBlackList();
    this.notifySubscribers();
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
    dataService.handleBlackListCategory(category, !(this.categories.get(category) ?? true));
  }

  getInvisibleCategories(): string[] {
    return Array.from(this.categories.entries())
      .filter(([_, visible]) => !visible)
      .map(([category]) => category);
  }
}

export const categoryService = CategoryService.getInstance();
