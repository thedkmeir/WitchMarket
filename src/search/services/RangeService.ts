import { Service } from "./Service";

class RangeService extends Service {
  private static instance: RangeService;
  static getInstance(): RangeService {
    if (!RangeService.instance) RangeService.instance = new RangeService();
    return RangeService.instance;
  }

  private Range: number[] = [];
  private InitRange: number[] = [];

  constructor() {
    super();
    this.clear();
  }

  clear() {
    this.Range = this.InitRange;
    this.notifySubscribers();
  }

  getRangeNumbers(): number[] {
    return this.Range;
  }

  setRangeNumbers(range: number[]) {
    this.Range = range;
    this.notifySubscribers();
  }

  setInitRangeNumbers(range: number[]) {
    this.InitRange = range;
    this.Range = range;
    this.notifySubscribers();
  }

  getInitRangeHighest(): number {
    return this.InitRange[1];
  }

  getInitRangeLowest(): number {
    return this.InitRange[0];
  }
}

export const rangeService = RangeService.getInstance();
