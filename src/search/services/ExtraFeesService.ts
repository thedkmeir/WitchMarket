import { cartService } from "./CartService";
import { dataService } from "./DataService";
import { Service } from "./Service";
import { Fee } from "./tools/Classes";

const allFees: Fee[] = [
  {
    category: "Fruits",
    price: 0.42,
    nameOfFee: "Ectoplasm Removal Fee",
    description: "Sticky spirits leave residue.",
  },
  {
    category: "Vegetables",
    price: 0.68,
    nameOfFee: "Ghoul Pest Control Charge",
    description: "Exorcising stubborn veggie-ghosts.",
  },
  {
    category: "Potions",
    price: 1.25,
    nameOfFee: "Magical Liability Coverage",
    description: "Protecting against potions gone wrong.",
  },
  {
    category: "Spells",
    price: 0.99,
    nameOfFee: "Hex Cancellation Insurance",
    description: "Undo accidental spells instantly.",
  },
  {
    category: "Accessories",
    price: 0.81,
    nameOfFee: "Cursed Jewelry Warranty",
    description: "Guaranteed charm without harmful side-effects.",
  },
];

class ExtraFeesService extends Service {
  private static instance: ExtraFeesService;
  static getInstance(): ExtraFeesService {
    if (!ExtraFeesService.instance)
      ExtraFeesService.instance = new ExtraFeesService();
    return ExtraFeesService.instance;
  }

  private allFeesMap: Map<string, Fee> = new Map();
  private feesList: Fee[] = [];
  private finalPrice: number = 0;

  constructor() {
    super();
    allFees.forEach((fee) => {
      this.allFeesMap.set(fee.category, fee);
    });
    this.fillEssentialFees();
    cartService.subscribe("ExtraFeesService", () => {
      this.clear();
    });
  }

  clear() {
    this.feesList = [];
    this.fillEssentialFees();
    this.fillCustomFees();
    this.calulateFinalPrice();
    this.notifySubscribers();
  }

  fillEssentialFees() {
    this.feesList = [
      {
        category: "Essential",
        nameOfFee: "Shipping",
        price: 5,
        description: "Standard shipping fee",
      },
      {
        category: "Essential",
        nameOfFee: "Protection Fee",
        price: 5,
        description: "Protecting your items from ill tempered creatures",
      },
      {
        category: "Essential",
        nameOfFee: "Handling",
        price: cartService.getUniqueItemsCount() * 0.5,
        description:
          "0.5$ per unique item in the cart, you have " +
          cartService.getUniqueItemsCount() +
          "...",
      },
      {
        category: "Essential",
        nameOfFee: "Ministry of Witches™ Convenience Tax",
        price: 3,
        description: "it is what it is",
      },
    ];
    this.notifySubscribers();
  }

  fillCustomFees() {
    cartService.getUniqueItems().forEach((itemName: string) => {
      const fee = this.allFeesMap.get(
        dataService.getProductByName(itemName)?.category || ""
      );

      // check id a fee with this category exists
      if (fee && !this.feesList.some((f) => f.category === fee?.category)) {
        this.feesList.push(fee);
      }
    });
  }

  getFeesList(): Fee[] {
    return this.feesList;
  }

  calulateFinalPrice() {
    this.finalPrice = cartService.getTotalCost();
    this.finalPrice += this.feesList.reduce((total, fee) => {
      return total + fee.price;
    }, 0);
    this.fixFinalPrice();
  }

  getFinalPrice(): number {
    return this.finalPrice;
  }

  private fixFinalPrice() {
    this.finalPrice = Math.round((this.finalPrice + Number.EPSILON) * 100) / 100;
  }
}

export const extraFeesService = ExtraFeesService.getInstance();
