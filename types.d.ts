type PriceHistory = {
  price: number;
  date: string;
};

type User = {
  email: string;
};
interface Product {
  _id?: string;
  url: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  isOutOfStock: boolean;
  images: string[];
  users?: User[];
  currency: string;
  discountRate: number;
  about: string[];
  rating: number;
  previousBought: string;
  categories: string[];
  ratingCountString: string;
  deliveryDate: string;
  priceHistory: PriceHistory[];
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
}

type NotificationType = "WELCOME" | "CHANGE_OF_STOCK" | "LOWEST_PRICE";

type EmailContent = {
  subject: string;
  body: string;
};

type EmailProductInfo = {
  title: string;
  url: string;
  image: string;
};
