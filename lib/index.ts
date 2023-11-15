"use server";

import Product from "@/models/productModal";
import { connectToDB } from "./connectDB";
import { scrapAmazonProduct } from "./scrapper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "./helper";
import { generateEmailBody, sendEmail } from "@/nodemailer";

export async function scrapAndStoreProduct(
  productUrl: string
): Promise<string | undefined> {
  if (!productUrl) return;

  try {
    // Connecting Database
    await connectToDB();

    // Scarapping product here
    const product: Product | undefined = await scrapAmazonProduct(productUrl);
    if (!product) return;

    let newProduct = product;

    //Finding existing product in database
    const existingProduct = await Product.findOne({ url: product.url });

    if (existingProduct) {
      if (existingProduct.currentPrice !== newProduct.currentPrice) {
        let updatedPriceHistory: PriceHistory[] = [
          ...existingProduct.priceHistory,
          {
            price: product.currentPrice,
            date: new Date(Date.now()).toDateString(),
          },
        ];
        newProduct = {
          ...product,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };
      }
    }

    // Saving new product to database

    const savedProduct = await Product.findOneAndUpdate(
      { url: product.url },
      newProduct,
      { upsert: true, new: true }
    );
    // console.log(savedProduct);
    if (savedProduct) return JSON.stringify(savedProduct);
  } catch (error: any) {
    console.log(error);

    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function getProductById(
  productId: string
): Promise<Product | null> {
  try {
    await connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (err: any) {
    console.log(err.message);
    return null;
    // throw new Error(`Failed to get product by id ${err.message}`);
  }
}

export async function getSimilarProducts(
  productId: string
): Promise<Product[] | undefined> {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    })
      .sort({ createdAt: 1 })
      .limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts(): Promise<Product[] | undefined> {
  try {
    connectToDB();

    const products: Product[] | undefined = await Product.find()
      .sort({ createdAt: -1 })
      .limit(6);

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
): Promise<boolean | undefined> {
  try {
    // console.log("Adding user email to product");

    const product = await Product.findById(productId);

    if (!product) return;

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExists) {
      product.users.push({ email: userEmail });
      await product.save();
      const emailContent = await generateEmailBody(product, "WELCOME");
      return await sendEmail(emailContent, [userEmail]);
    } else {
      throw new Error("User already on our list");
    }
  } catch (error) {
    throw error;
  }
}
