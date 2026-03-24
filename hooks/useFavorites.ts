import { useState, useEffect } from 'react';

export interface FavoriteItem {
  id: string;
  title: string;
  episode: number;
  location: string;
  imageUrl: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('rickmorty_favorites');
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      }
    } catch (e) {
      console.error("Local storage error", e);
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      const isFav = prev.some((fav) => fav.id === item.id);
      let updated;
      if (isFav) {
        updated = prev.filter((fav) => fav.id !== item.id);
      } else {
        updated = [...prev, item];
      }
      localStorage.setItem('rickmorty_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
