export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            this.updateItem(item);
        }

        return this.items;
    }

    private updateItem(item: Item) {
        if (item.name === "Sulfuras, Hand of Ragnaros") {
            return;
        }

        item.sellIn -= 1;

        let qualityChange = this.getQualityChange(item);

        item.quality = Math.max(0, Math.min(50, item.quality + qualityChange));
    }

    private getQualityChange(item: Item): number {
        switch (item.name) {
            case "Aged Brie":
                return item.sellIn < 0 ? 2 : 1;

            case "Backstage passes to a TAFKAL80ETC concert":
                if (item.sellIn < 0) return -item.quality;
                if (item.sellIn < 5) return 3;
                if (item.sellIn < 10) return 2;
                return 1;

            case "Conjured":
                return item.sellIn < 0 ? -4 : -2;

            default:
                return item.sellIn < 0 ? -2 : -1;
        }
    }
}