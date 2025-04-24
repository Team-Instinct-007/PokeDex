import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import Swal from 'sweetalert2';
import { getTypeColor, getStatColor, formatPokemonId } from '../utils/pokemonUtils';

function DetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
        setLoading(false);
        
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter(favId => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      Swal.fire({
        title: 'Removed!',
        text: `${pokemon.name} has been removed from favorites`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      Swal.fire({
        title: 'Added!',
        text: `${pokemon.name} has been added to favorites`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
    
    setIsFavorite(!isFavorite);
  };

  if (loading) return <div className="container mx-auto p-8 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto p-8 text-center text-red-500">Error: {error}</div>;
  if (!pokemon) return null;

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isFavorite ? 'text-yellow-500' : 'text-gray-400'
              } hover:text-yellow-500`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
          <span className="text-xl text-gray-600">{formatPokemonId(pokemon.id)}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img 
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-64 h-64 object-contain"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Types</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span 
                    key={type.type.name}
                    className="px-3 py-1 rounded text-white"
                    style={{ backgroundColor: getTypeColor(type.type.name) }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Abilities</h2>
              <ul className="list-disc list-inside">
                {pokemon.abilities.map((ability) => (
                  <li key={ability.ability.name} className="capitalize">
                    {ability.ability.name}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Base Stats</h2>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between">
                      <span className="capitalize">{stat.stat.name}</span>
                      <span>{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded">
                      <div 
                        className="h-2 rounded" 
                        style={{
                          width: `${(stat.base_stat / 255) * 100}%`,
                          backgroundColor: getStatColor(stat.stat.name)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;