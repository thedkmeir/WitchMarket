export enum SortType {
  AtoZ = "A-Z",
  ZtoA = "Z-A",
  HPrice = "Highest Price",
  LPrice = "Lowest Price",
}
export const sortTypes = Object.values(SortType);

type EnumCallback = (sortType: SortType) => void;

class SortService {
  private static instance: SortService;
  private subscribers: EnumCallback[] = [];
  private sortIndex: SortType = SortType.AtoZ;

  constructor() {}

  clear() {
    this.sortIndex = SortType.AtoZ;
    this.notifySubscribers();
  }

  static getInstance(): SortService {
    if (!SortService.instance) SortService.instance = new SortService();
    return SortService.instance;
  }

  subscribe(callback: EnumCallback): () => void {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: EnumCallback) {
    this.subscribers = this.subscribers.filter((cb) => cb !== callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.sortIndex));
  }

  getSortIndex(): SortType {
    return this.sortIndex;
  }

  setSortIndex(sortType?: SortType) {
    if (sortType === undefined) sortType = SortType.AtoZ;
    else this.sortIndex = sortType;
    this.notifySubscribers();
  }
}

export const sortService = SortService.getInstance();
