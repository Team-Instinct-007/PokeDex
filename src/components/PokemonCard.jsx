import { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { getTypeColor } from '../utils/pokemonUtils';

function PokemonCard({ pokemonId, onRemove }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  if (loading) return <div className="p-4 bg-white rounded-lg shadow animate-pulse">Loading...</div>;
  if (error) return <div className="p-4 bg-white rounded-lg shadow text-red-500">Error loading Pokemon</div>;
  if (!pokemon) return null;

  const handleRemove = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove ${pokemon.name} from favorites?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onRemove(pokemonId);
        Swal.fire(
          'Removed!',
          `${pokemon.name} has been removed from favorites.`,
          'success'
        );
      }
    });
  };

  return (
    <Link to={`/detail/${pokemonId}`} className="block">
      <div className="p-4 bg-slate-700 text-white rounded-lg shadow-xl/40 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
            aria-label="Remove from favorites"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="w-full h-48 object-contain mb-4"
        />
        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <span 
              key={type.type.name}
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: getTypeColor(type.type.name) }}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard; 