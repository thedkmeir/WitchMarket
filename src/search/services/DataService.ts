import { inStockService } from "./InStockService";
import { rangeService } from "./RangeService";
import { searchService } from "./SearchService";
import { sortService } from "./SortService";
import { Service } from "./Service";
import { Product } from "./tools/Classes";
import { SortType } from "./tools/Enums";

const products: Product[] = [
  // Haunted Fruits
  { category: "Fruits", price: 1.2, stocked: true, name: "Witch Apple" },
  { category: "Fruits", price: 1.4, stocked: true, name: "Blood Orange" },
  { category: "Fruits", price: 2, stocked: false, name: "Ghostly Grape" },
  { category: "Fruits", price: 3.1, stocked: false, name: "Rotten Banana" },
  { category: "Fruits", price: 2.3, stocked: true, name: "Mystic Mango" },
  { category: "Fruits", price: 1.8, stocked: true, name: "Shadow Berry" },
  { category: "Fruits", price: 4.2, stocked: false, name: "Cursed Kiwi" },
  { category: "Fruits", price: 2.6, stocked: true, name: "Strawberry Scream" },

  // Creepy Vegetables
  { category: "Vegetables", price: 2.2, stocked: true, name: "Zombie Spinach" },
  {
    category: "Vegetables",
    price: 4.3,
    stocked: false,
    name: "Haunted Pumpkin",
  },
  { category: "Vegetables", price: 1.1, stocked: true, name: "Ghoul Peas" },
  { category: "Vegetables", price: 2.4, stocked: true, name: "Vampire Tomato" },
  { category: "Vegetables", price: 3.6, stocked: true, name: "Carrot of Doom" },
  {
    category: "Vegetables",
    price: 2.9,
    stocked: false,
    name: "Broccoli Brains",
  },
  {
    category: "Vegetables",
    price: 1.5,
    stocked: true,
    name: "Nightshade Lettuce",
  },

  // Spooky Dairy
  { category: "Dairy", price: 5.2, stocked: true, name: "Cheddar Cauldron" },
  { category: "Dairy", price: 4.4, stocked: true, name: "Midnight Milk" },
  { category: "Dairy", price: 6.6, stocked: false, name: "Spectral Cheese" },
  { category: "Dairy", price: 3.8, stocked: true, name: "Yogurt Ooze" },
  { category: "Dairy", price: 5.5, stocked: true, name: "Witch Cream" },

  // Witchy Beverages
  { category: "Beverages", price: 2.3, stocked: true, name: "Pumpkin Punch" },
  { category: "Beverages", price: 1.7, stocked: true, name: "Ghoul Soda" },
  {
    category: "Beverages",
    price: 3.2,
    stocked: false,
    name: "Black Cat Coffee",
  },
  {
    category: "Beverages",
    price: 2.7,
    stocked: true,
    name: "Witch’s Brew Tea",
  },
  { category: "Beverages", price: 3.0, stocked: true, name: "Eyeball Latte" },

  // Monster Snacks
  { category: "Snacks", price: 1.3, stocked: true, name: "Crispy Bones" },
  { category: "Snacks", price: 2.5, stocked: false, name: "Frosted Eyeballs" },
  { category: "Snacks", price: 3.8, stocked: true, name: "Ghoul Granola" },
  { category: "Snacks", price: 4.1, stocked: true, name: "Monster Mix" },
  { category: "Snacks", price: 2.2, stocked: true, name: "Spooky Crackers" },

  // Bewitched Bakery
  { category: "Bakery", price: 2.7, stocked: true, name: "Spider Croissant" },
  { category: "Bakery", price: 3.1, stocked: false, name: "Mummy Muffin" },
  { category: "Bakery", price: 2.9, stocked: true, name: "Batwing Baguette" },
  {
    category: "Bakery",
    price: 4.2,
    stocked: true,
    name: "Cursed Cinnamon Roll",
  },
  { category: "Bakery", price: 3.6, stocked: true, name: "Phantom Danish" },

  // Potions
  {
    category: "Potions",
    price: 7.5,
    stocked: true,
    name: "Potion of Invisibility",
  },
  { category: "Potions", price: 9.2, stocked: true, name: "Witch's Elixir" },
  { category: "Potions", price: 8.5, stocked: false, name: "Vampire Venom" },
  {
    category: "Potions",
    price: 10,
    stocked: true,
    name: "Goblin Growth Tonic",
  },
  { category: "Potions", price: 12, stocked: true, name: "Truth Serum" },

  // Spells
  {
    category: "Spells",
    price: 5.5,
    stocked: true,
    name: "Spell of Levitation",
  },
  { category: "Spells", price: 6.6, stocked: true, name: "Hex of Silence" },
  {
    category: "Spells",
    price: 4.8,
    stocked: false,
    name: "Curse of Itchy Feet",
  },

  // Costumes
  { category: "Costumes", price: 15.5, stocked: true, name: "Skeleton Suit" },
  { category: "Costumes", price: 18.0, stocked: false, name: "Zombie Rags" },
  { category: "Costumes", price: 22.5, stocked: true, name: "Witch Robe" },
  { category: "Costumes", price: 19.5, stocked: true, name: "Pumpkin Head" },

  // Candies
  { category: "Candies", price: 1.5, stocked: true, name: "Candy Corn" },
  { category: "Candies", price: 2.2, stocked: false, name: "Licorice Fangs" },
  { category: "Candies", price: 1.8, stocked: true, name: "Toffee Skulls" },
  {
    category: "Candies",
    price: 2.4,
    stocked: true,
    name: "Spooky Gummy Worms",
  },

  // Accessories
  { category: "Accessories", price: 3.5, stocked: true, name: "Mini Cauldron" },
  {
    category: "Accessories",
    price: 4.0,
    stocked: false,
    name: "Broomstick Keychain",
  },
  {
    category: "Accessories",
    price: 2.8,
    stocked: true,
    name: "Glow-in-the-Dark Necklace",
  },
  {
    category: "Accessories",
    price: 3.2,
    stocked: true,
    name: "Vampire Earrings",
  },
];

class DataService extends Service {
  private static instance: DataService;
  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  public storeCatalog: Map<string, Product[]> = new Map();
  private storeCatalogTotalCount: number = 0;
  private storeCatalogFilteredCount: number = 0;
  private blackListedCategories: string[] = [];

  constructor() {
    super();
    let highestPrice: number = 0;
    let lowestPrice: number = 0;
    this.storeCatalog = new Map();
    products.forEach((product) => {
      const category = product.category;
      if (!this.storeCatalog.has(category)) {
        this.storeCatalog.set(category, []);
      }
      this.storeCatalog.get(category)?.push(product);
      highestPrice = Math.max(highestPrice, product.price);
      lowestPrice = Math.min(lowestPrice || product.price, product.price);
      this.storeCatalogTotalCount++;
    });

    this.storeCatalogFilteredCount = this.storeCatalogTotalCount;
    lowestPrice = Math.floor(lowestPrice);
    highestPrice = Math.ceil(highestPrice);

    this.sortProducts();

    rangeService.setInitRangeNumbers([lowestPrice, highestPrice]);

    searchService.subscribe(
      "DataService",
      this.updateFilteredCatalog.bind(this)
    );
    inStockService.subscribe(
      "DataService",
      this.updateFilteredCatalog.bind(this)
    );
    rangeService.subscribe(
      "DataService",
      this.updateFilteredCatalog.bind(this)
    );
    sortService.subscribe("DataService", this.sortProducts.bind(this));
  }

async updateFilteredCatalog() {
  // Get current filter criteria
  const searchTerm = searchService.getSearchTerm().toLowerCase();
  const showOnlyInStock = inStockService.getInStock();
  const range = rangeService.getRangeNumbers() as [number, number];
  
  // Clear and rebuild the catalog
  this.storeCatalog.clear();
  this.storeCatalogFilteredCount = 0;

  // Filter and categorize products
  products.forEach((product) => {
    // Apply all filters
    if (!product.name.toLowerCase().includes(searchTerm)) return;
    if (showOnlyInStock && !product.stocked) return;
    if (product.price < range[0] || product.price > range[1]) return;
    
    const category = product.category;
    
    // Initialize category array if it doesn't exist
    if (!this.storeCatalog.has(category)) {
      this.storeCatalog.set(category, []);
    }
    
    // Add product to category
    this.storeCatalog.get(category)!.push(product);
    
    // Only count products from non-blacklisted categories
    if (!this.blackListedCategories.includes(category)) {
      this.storeCatalogFilteredCount++;
    }
  });

  // Sort the filtered products
  this.sortProducts();
}

  sortProducts() {
    const sortType: SortType = sortService.getSortIndex();
    const updatedCatalog = new Map<string, Product[]>();

    this.storeCatalog.forEach((products, category) => {
      const sortedProducts = [...products].sort((a, b) => {
        if (sortType === SortType.AtoZ) {
          return a.name.localeCompare(b.name);
        } else if (sortType === SortType.ZtoA) {
          return b.name.localeCompare(a.name);
        } else if (sortType === SortType.LPrice) {
          return a.price - b.price;
        } else if (sortType === SortType.HPrice) {
          return b.price - a.price;
        }
        return 0;
      });

      updatedCatalog.set(category, sortedProducts);
    });

    this.storeCatalog = updatedCatalog;
    this.notifySubscribers();
  }

  getStoreCatalog(): Map<string, Product[]> {
    return this.storeCatalog;
  }

  getMyProducts(category: string): Product[] {
    return this.storeCatalog.get(category) || [];
  }

  getProductByName(name: string): Product | undefined {
    for (const products of this.storeCatalog.values()) {
      const product = products.find((p) => p.name === name);
      if (product) {
        return product;
      }
    }
    return undefined;
  }

  getCategories(): string[] {
    return Array.from(this.storeCatalog.keys());
  }

  getFilledCategories(): string[] {
    return Array.from(this.storeCatalog.keys()).filter(
      (category) => (this.storeCatalog.get(category) ?? []).length > 0
    );
  }

  getStoreCatalogTotalCount(): number {
    return this.storeCatalogTotalCount;
  }

  getStoreCatalogFilteredCount(): number {
    return this.storeCatalogFilteredCount;
  }

  handleBlackListCategory(category: string, isBlackListed: boolean) {
    const count = this.storeCatalog.get(category)?.length || 0;
    if (isBlackListed) {
      this.blackListedCategories.push(category);
      this.storeCatalogFilteredCount -= count;
    } else {
      this.blackListedCategories = this.blackListedCategories.filter(
        (cat) => cat !== category
      );
      this.storeCatalogFilteredCount += count;
    }
    this.notifySubscribers();
  }

  clearBlackList() {
    this.blackListedCategories = [];
  }
}

export const dataService = DataService.getInstance();
