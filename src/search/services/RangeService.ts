type RangeCallback = (range: number[]) => void;

class RangeService {
  private static instance: RangeService;
  private subscribers: RangeCallback[] = [];
  private Range: number[] = [];
  private InitRange: number[] = [];

  constructor() {
    this.clear();
  }

  clear() {
    this.Range = this.InitRange;
    this.notifySubscribers();
  }

  static getInstance(): RangeService {
    if (!RangeService.instance) RangeService.instance = new RangeService();
    return RangeService.instance;
  }

  subscribe(callback: RangeCallback): () => void {
    this.subscribers.push(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: RangeCallback) {
    this.subscribers = this.subscribers.filter((cb) => cb !== callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.Range));
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