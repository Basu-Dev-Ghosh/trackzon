import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectDB";
import { scrapAmazonProduct } from "@/lib/scrapper";
import Product from "@/models/productModal";
import {
  getAveragePrice,
  getHighestPrice,
  getLowestPrice,
  getEmailNotifType,
} from "@/lib/helper";
import { generateEmailBody, sendEmail } from "@/nodemailer";

export const maxDuration = 10; // This function can run for a maximum of 300 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products) throw new Error("No product fetched");

    // SCRAPE LATEST PRODUCT DETAILS & UPDATE DB
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        // Scrape product
        const scrapedProduct = await scrapAmazonProduct(currentProduct.url);

        if (!scrapedProduct) return;
        let updatedPriceHistory = currentProduct.priceHistory;
        if (scrapedProduct.currentPrice !== currentProduct.currentPrice) {
          updatedPriceHistory = [
            ...updatedPriceHistory,
            {
              price: scrapedProduct.currentPrice,
            },
          ];
        }

        const product = {
          ...scrapedProduct,
          users: currentProduct.users,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };
        // Update Products in DB
        const updatedProduct = await Product.findOneAndUpdate(
          {
            url: currentProduct.url,
          },
          product
        );

        //  CHECK EACH PRODUCT'S STATUS & SEND EMAIL ACCORDINGLY
        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );

        if (emailNotifType && updatedProduct.users.length > 0) {
          // Construct emailContent
          const emailContent = await generateEmailBody(
            updatedProduct,
            emailNotifType
          );
          // Get array of user emails
          const userEmails = updatedProduct.users.map(
            (user: any) => user.email
          );
          // Send email notification
          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProducts,
    });
  } catch (error: any) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
}
