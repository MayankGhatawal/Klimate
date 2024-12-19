import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/wether";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEY = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  Search: (query: string) => ["location-search", query] as const,
} as const;
export const useWeatherQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEY.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
};

export const useForecastQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForcast(coordinates) : null),
    enabled: !!coordinates,
  });
};

export const useReverseGeoCoding = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeoCode(coordinates) : null,
    enabled: !!coordinates,
  });
};

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATHER_KEY.Search(query),
    queryFn: () => weatherAPI.searchLocation(query),
    enabled: query.length >= 3,
  });
}
