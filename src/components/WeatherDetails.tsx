import type { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface WeatherDataProps {
  data: WeatherData;
}

export const WeatherDetails = ({ data }: WeatherDataProps) => {
  const { wind, main, sys } = data;

  const formatTime = (timeStamp: number) =>
    format(new Date(timeStamp * 1000), "h:mm a");

  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: sys.sunrise ? formatTime(sys.sunrise) : "N/A",
      icons: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: sys.sunset ? formatTime(sys.sunset) : "N/A",
      icons: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value:
        wind.deg !== undefined
          ? `${getWindDirection(wind.deg)} (${wind.deg}°)`
          : "N/A",
      icons: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: main.pressure ? `${main.pressure} hPa` : "N/A",
      icons: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4 shadow-sm"
              role="listitem"
              aria-label={`${detail.title}: ${detail.value}`}
            >
              <detail.icons className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
