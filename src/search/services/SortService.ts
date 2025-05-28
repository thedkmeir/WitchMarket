import { Service } from "./Service";
import { SortType } from "./tools/Enums";

class SortService extends Service {
  private static instance: SortService;
  static getInstance(): SortService {
    if (!SortService.instance) SortService.instance = new SortService();
    return SortService.instance;
  }

  private sortIndex: SortType = SortType.AtoZ;

  constructor() {
    super();
  }

  clear() {
    this.sortIndex = SortType.AtoZ;
    this.notifySubscribers();
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
export { SortType };

