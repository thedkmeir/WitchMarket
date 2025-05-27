type StringCallback = (term: string) => void;

class SearchService {
  private static instance: SearchService;
  private subscribers: StringCallback[] = [];
  private searchTerm: string = "";

  constructor() {}

  clear() {
    this.searchTerm = "";
    this.notifySubscribers();
  }

  static getInstance(): SearchService {
    if (!SearchService.instance) SearchService.instance = new SearchService();
    return SearchService.instance;
  }

  subscribe(callback: StringCallback): () => void {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: StringCallback) {
    this.subscribers = this.subscribers.filter((cb) => cb !== callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.searchTerm));
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
