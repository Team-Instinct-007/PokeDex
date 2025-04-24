import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (pokemonId) => {
    const newFavorites = favorites.filter(id => id !== pokemonId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Favorite Pokemon</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You haven't added any Pokemon to your favorites yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Favorite Pokemon</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((pokemonId) => (
          <PokemonCard
            key={pokemonId}
            pokemonId={pokemonId}
            onRemove={handleRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoritePage;