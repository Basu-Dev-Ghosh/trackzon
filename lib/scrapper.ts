import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "./helper";

export async function scrapAmazonProduct(
  productUrl: string
): Promise<Product | undefined> {
  if (!productUrl) return;
  const userName = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const sessionId = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${userName}-session-${sessionId}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };
  try {
    // fetch the product page
    const response = await axios.get(productUrl, options);
    const $ = cheerio.load(response.data);

    // Extracting the title of the product
    const title = $("#productTitle").text().trim();

    // Extracting the current price of the product
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    // Extracting the original price of the product
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    // Extracting the currency of the product
    const currency = extractCurrency($(".a-price-symbol"));

    // Extracting the is out of stock or not the product
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    // Extracting the images of the product
    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image");

    const imageUrls = Object.keys(JSON.parse(images!));

    // Extracting the discount rate of the product
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    // Extracting the about section of the product
    const about = $(
      ".a-unordered-list.a-vertical.a-spacing-mini .a-spacing-mini .a-list-item"
    )
      .text()
      .trim()
      .split("   ");

    // Extracting the rating of the product
    const rating = $(
      ".a-popover-trigger.a-declarative span.a-size-base.a-color-base"
    )
      .text()
      .trim();

    // Extracting the previous bought of the product
    const previousBought = $("#social-proofing-faceout-title-tk_bought span")
      .text()
      .trim();

    // Extracting the categories of the product
    const categories = $(
      ".a-unordered-list.a-horizontal.a-size-small .a-link-normal.a-color-tertiary"
    )
      .text()
      .replace(/[" "]/g, "")
      .replace(/[\n]/g, " ")
      .split(" ")
      .filter(Boolean);

    // Extracting the ratings count string of the product
    const ratingCountString = $(
      ".a-row.a-spacing-medium.averageStarRatingNumerical span.a-size-base.a-color-secondary"
    )
      .text()
      .trim();

    // Extracting the delivery Date of the product
    const deliveryDate = $(
      "#mir-layout-DELIVERY_BLOCK-slot-PRIMARY_DELIVERY_MESSAGE_LARGE span span.a-text-bold"
    )
      .text()
      .trim();

    const data = {
      url: productUrl,
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      currency,
      images: imageUrls,
      priceHistory: [
        {
          price: Number(currentPrice) || Number(originalPrice),
          date: new Date(Date.now()).toDateString(),
        },
      ],
      discountRate: Number(discountRate),
      about,
      previousBought,
      categories,
      rating: parseFloat(rating),
      ratingCountString,
      deliveryDate,
      isOutOfStock: outOfStock,
      lowestPrice: Number(currentPrice),
      highestPrice: Number(currentPrice),
      averagePrice: Number(currentPrice),
      users: [],
    };
    return data;
  } catch (error: any) {
    console.log(error);

    throw new Error("Failed to scrap product", error.message);
  }
}
