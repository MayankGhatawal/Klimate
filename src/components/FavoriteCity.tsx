import { useFavorite } from "@/hooks/use-favorite";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

export const FavoriteCity = () => {
  const { favorites, removeFavorite } = useFavorite();
  if (!favorites.length) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tighter mb-4">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex flex-wrap gap-4">
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate();

  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role="button"
      tabIndex={0}
      className="relative flex flex-col items-start gap-3 w-[250px] cursor-pointer rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
    >
      <Button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from favorites`);
        }}
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground"
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="flex gap-4">
        {isLoading ? (
          <div className="flex h-8 items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : weather ? (
          <>
            <div className="flex items-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
                className="h-8 w-8"
              />
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">
                  {weather.sys.country}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">
                {Math.round(weather.main.temp)}°C
              </p>
              <p className="text-xs capitalize text-muted-foreground">
                {weather.weather[0].description}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default FavoriteCityTablet;
