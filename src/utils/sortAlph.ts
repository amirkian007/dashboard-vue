interface Sortable {
  sort(items: string[]): string[];
}

class SortByNameAsc implements Sortable {
  sort(items: string[]): string[] {
    return items.sort((a, b) => a.localeCompare(b));
  }
}

class SortByNameDesc implements Sortable {
  sort(items: string[]): string[] {
    return items.sort((a, b) => b.localeCompare(a));
  }
}

type Strategy = "asc" | "desc";

export class Sorter {
  private strategy: Sortable;

  constructor(type: Strategy) {
    switch (type) {
      case "asc":
        this.strategy = new SortByNameAsc() as Sortable;
        break;
      case "desc":
        this.strategy = new SortByNameDesc() as Sortable;
        break;
      default:
        throw new Error(`Unsupported sort type: ${type}`);
    }
  }
  sort(items: string[]): string[] {
    return this.strategy.sort(items);
  }
}
