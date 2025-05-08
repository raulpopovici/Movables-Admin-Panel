"use client";

import { useUsers } from "@/hooks/useUsers";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const months = ["January", "February", "March", "April", "May", "June", "July"];

const getMockedChartData = (users: any[]) => {
  const result = months.map((month) => ({
    month,
    signups: 0,
  }));

  users.forEach((_, idx) => {
    const monthIndex = idx % months.length;
    result[monthIndex].signups += 1;
  });

  return result;
};

export function UserAreaChart() {
  const { data: users = [], isLoading } = useUsers();
  const chartData = getMockedChartData(users);

  return (
    <div className="w-full max-w-xs">
      <Card className="rounded-2xl shadow-sm border bg-background">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">User Signups</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Overview by month
          </CardDescription>
        </CardHeader>

        <CardContent className="h-[120px] px-2 pb-0">
          {isLoading ? (
            <div className="text-sm text-muted-foreground">
              Loading chart...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 6, right: 6, left: 6, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="signupGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4BA6A6" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#4BA6A6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  tickMargin={4}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  width={26}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    fontSize: "0.75rem",
                    boxShadow: "0 0 8px rgba(0,0,0,0.05)",
                    border: "none",
                  }}
                  labelStyle={{ fontWeight: 500 }}
                  formatter={(value: any) => [`${value}`, "Signups"]}
                />
                <Area
                  type="monotone"
                  dataKey="signups"
                  stroke="#4BA6A6"
                  fill="url(#signupGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>

        <CardFooter className="pt-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-green-600" />
            Signups are trending upward
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
