import { Service } from "./Service";

class SearchService extends Service {
  private static instance: SearchService;
  static getInstance(): SearchService {
    if (!SearchService.instance) SearchService.instance = new SearchService();
    return SearchService.instance;
  }

  private searchTerm: string = "";

  constructor() {
    super();
  }

  clear() {
    this.searchTerm = "";
    this.notifySubscribers();
  }

  getSearchTerm(): string {
    return this.searchTerm;
  }

  setSearchTerm(term?: string) {
    if (term === undefined) term = "";
    else this.searchTerm = term;
    this.notifySubscribers();
  }
}

export const searchService = SearchService.getInstance();
