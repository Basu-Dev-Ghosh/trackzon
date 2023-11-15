const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
};

export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, "");

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }

      return firstPrice || cleanPrice;
    }
  }

  return "";
}
export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

export function getLowestPrice(priceHistory: PriceHistory[]): number {
  const prices = priceHistory.map((price) => price.price);
  return Math.min(...prices);
}
export function getHighestPrice(priceHistory: PriceHistory[]): number {
  const prices = priceHistory.map((price) => price.price);
  return Math.max(...prices);
}
export function getAveragePrice(priceHistory: PriceHistory[]): number {
  const sumOfPrices = priceHistory.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceHistory.length || 1;

  return averagePrice;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }

  return null;
};
