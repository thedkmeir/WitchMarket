import { dataService } from "./DataService";
import { Service } from "./Service";

class CategoryFilterService extends Service {
  private static instance: CategoryFilterService;
  static getInstance(): CategoryFilterService {
    if (!CategoryFilterService.instance)
      CategoryFilterService.instance = new CategoryFilterService();
    return CategoryFilterService.instance;
  }

  private filterCategories: string[] = [];

  constructor() {
    super();
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

  getFilterCategories(): string[] {
    return this.filterCategories;
  }

  updateFilterCategories() {
    this.filterCategories = dataService.getFilledCategories();
    this.notifySubscribers();
  }
}

export const categoryFilterService = CategoryFilterService.getInstance();
