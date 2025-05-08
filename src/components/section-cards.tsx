"use client";

import { useOrders } from "@/hooks/useOrders";
import { useUsers } from "@/hooks/useUsers";
import { useReviews } from "@/hooks/useReviews";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

export function SectionCards() {
  const { data: orders, isLoading, isError } = useOrders();
  const { data: users = [] } = useUsers();
  const { data: reviews = [] } = useReviews();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !orders) return <div>Error loading orders.</div>;

  const orders2024 = orders.filter((_, i) => i % 2 === 0);
  const orders2023 = orders.filter((_, i) => i % 2 !== 0);

  const revenue2024 = orders2024.reduce(
    (sum, order) => sum + parseFloat(order.totalSum),
    0
  );
  const revenue2023 = orders2023.reduce(
    (sum, order) => sum + parseFloat(order.totalSum),
    0
  );

  const totalOrders2024 = orders2024.length;
  const totalOrders2023 = orders2023.length;

  const uniqueCustomers2024 = new Set(orders2024.map((o) => o.userId)).size;
  const uniqueCustomers2023 = new Set(orders2023.map((o) => o.userId)).size;

  const avgOrderValue2024 =
    totalOrders2024 > 0 ? revenue2024 / totalOrders2024 : 0;
  const avgOrderValue2023 =
    totalOrders2023 > 0 ? revenue2023 / totalOrders2023 : 0;

  const getPercentageChange = (newVal: number, oldVal: number) => {
    if (oldVal === 0) return 100;
    return ((newVal - oldVal) / oldVal) * 100;
  };

  // Process reviews by product
  const ratingByProduct = new Map<
    string,
    { ratings: number[]; name: string }
  >();

  reviews
    .filter((r) => r?.__product__?.id)
    .forEach((review) => {
      const product = review.__product__;
      const productId = product.id;
      if (!ratingByProduct.has(productId)) {
        ratingByProduct.set(productId, {
          ratings: [],
          name: product.productName,
        });
      }
      ratingByProduct.get(productId)!.ratings.push(review.rating);
    });

  const productAverages = Array.from(ratingByProduct.entries()).map(
    ([productId, { ratings, name }]) => ({
      productId,
      name,
      avg: ratings.reduce((a, b) => a + b, 0) / ratings.length,
    })
  );

  const highestRated = productAverages.reduce(
    (a, b) => (a.avg > b.avg ? a : b),
    productAverages[0]
  );
  const lowestRated = productAverages.reduce(
    (a, b) => (a.avg < b.avg ? a : b),
    productAverages[0]
  );

  const overallAvgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const metricCards = [
    {
      title: "Revenue This Year",
      description: "Total income from orders",
      value: `$${revenue2024.toFixed(2)}`,
      change: getPercentageChange(revenue2024, revenue2023),
    },
    {
      title: "Orders Placed (2024)",
      description: "Number of orders placed",
      value: `${totalOrders2024}`,
      change: getPercentageChange(totalOrders2024, totalOrders2023),
    },
    {
      title: "Distinct Customers",
      description: "Unique customer count",
      value: `${uniqueCustomers2024}`,
      change: getPercentageChange(uniqueCustomers2024, uniqueCustomers2023),
    },
    {
      title: "Average Order Value",
      description: "Revenue per order",
      value: `$${avgOrderValue2024.toFixed(2)}`,
      change: getPercentageChange(avgOrderValue2024, avgOrderValue2023),
    },
    {
      title: "Total Users",
      description: "Registered accounts",
      value: `${users.length}`,
      change: 0,
    },
    {
      title: "Overall Rating",
      description: "Average across all reviews",
      value: `${overallAvgRating.toFixed(2)} / 5`,
      change: 0,
    },
    {
      title: "Top Rated Product",
      description: "Highest average rating",
      value: highestRated ? (
        <div className="flex flex-col items-start">
          <span>{highestRated.name}</span>
          <span className="text-muted-foreground text-sm">
            {highestRated.avg.toFixed(2)} / 5
          </span>
        </div>
      ) : (
        "N/A"
      ),

      change: 0,
    },
    {
      title: "Lowest Rated Product",
      description: "Lowest average rating",
      value: lowestRated ? (
        <div className="flex flex-col items-start">
          <span>{lowestRated.name}</span>
          <span className="text-muted-foreground text-sm">
            {lowestRated.avg.toFixed(2)} / 5
          </span>
        </div>
      ) : (
        "N/A"
      ),

      change: 0,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 lg:px-6">
      {metricCards.map((card, i) => {
        const isUp = card.change >= 0;
        const Icon = isUp ? TrendingUpIcon : TrendingDownIcon;

        return (
          <Card key={i} className="@container/card">
            <CardHeader className="relative">
              <CardDescription>{card.description}</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                {card.value}
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className={`flex gap-1 rounded-lg text-xs ${
                    isUp ? "text-green-600" : "text-red-500"
                  }`}
                >
                  <Icon className="size-3" />
                  {card.change.toFixed(1)}%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">
              {card.title === "Overall Rating"
                ? "Based on all user reviews"
                : card.title.includes("Product")
                ? "Based on average review rating"
                : "Compared to last year"}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
