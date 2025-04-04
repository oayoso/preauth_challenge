interface UpdateStrategy {
    update(item: Item): void;
}

class NormalItemStrategy implements UpdateStrategy {
    update(item: Item): void {
        item.sellIn -= 1;
        const qualityChange = item.sellIn < 0 ? -2 : -1;
        item.quality = Math.max(0, item.quality + qualityChange);
    }
}

class AgedBrieStrategy implements UpdateStrategy {
    update(item: Item): void {
        item.sellIn -= 1;
        const qualityChange = item.sellIn < 0 ? 2 : 1;
        item.quality = Math.min(50, item.quality + qualityChange);
    }
}

class BackstagePassStrategy implements UpdateStrategy {
    update(item: Item): void {
        item.sellIn -= 1;
        let qualityChange = 0;

        if (item.sellIn < 0) {
            item.quality = 0;
            return;
        } else if (item.sellIn < 5) {
            qualityChange = 3;
        } else if (item.sellIn < 10) {
            qualityChange = 2;
        } else {
            qualityChange = 1;
        }

        item.quality = Math.min(50, item.quality + qualityChange);
    }
}

class ConjuredStrategy implements UpdateStrategy {
    update(item: Item): void {
        item.sellIn -= 1;
        const qualityChange = item.sellIn < 0 ? -4 : -2;
        item.quality = Math.max(0, item.quality + qualityChange);
    }
}

class LegendaryItemStrategy implements UpdateStrategy {
    update(item: Item): void {
    }
}

class ItemFactory {
    static getStrategy(item: Item): UpdateStrategy {
        switch (item.name) {
            case "Aged Brie":
                return new AgedBrieStrategy();
            case "Backstage passes to a TAFKAL80ETC concert":
                return new BackstagePassStrategy();
            case "Conjured":
                return new ConjuredStrategy();
            case "Sulfuras, Hand of Ragnaros":
                return new LegendaryItemStrategy();
            default:
                return new NormalItemStrategy();
        }
    }
}

export class Item {
    name: string;
    sellIn: number;
    quality: number;
    private strategy: UpdateStrategy;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
        this.strategy = ItemFactory.getStrategy(this);
    }

    updateQuality(): void {
        this.strategy.update(this);
    }
}


export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            item.updateQuality();
        }
        return this.items;
    }
}
