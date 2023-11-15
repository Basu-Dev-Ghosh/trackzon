import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    images: [{ type: String, required: true }],
    priceHistory: [
      {
        price: { type: Number },
        date: { type: Date, default: Date.now },
      },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    about: [{ type: String }],
    previousBought: { type: String },
    categories: [{ type: String }],
    rating: { type: Number },
    ratingCountString: { type: String },
    deliveryDate: { type: String },
    isOutOfStock: { type: Boolean, default: false },
    users: [{ email: { type: String } }],
    default: [],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
