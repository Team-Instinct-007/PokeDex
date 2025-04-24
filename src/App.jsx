import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");
  const [pokes, setPokes] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      const searchPoke = async () => {
        try {
          const { data } = await axios.get(
            "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
          );
          const allPokes = data.results;
          if (search) {
            const filtered = allPokes.filter((poke) =>
              poke.name.toLowerCase().includes(search.toLowerCase())
            );
            setPokes(filtered);

            // isi dari filtered = array of object { name, url, [] }
            // array of object { name, image, abilities, type, evolution}
            setCompleted([]);

            const detailedData = await Promise.all(
              filtered.map(async (pokemon) => {
                const { data } = await axios.get(
                  `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                );
                return data;
              })
            );

            setCompleted(detailedData);
            console.log(detailedData);
          } else {
            setCompleted([]);

            const detailedData = await Promise.all(
              allPokes.map(async (pokemon) => {
                const { data } = await axios.get(
                  `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                );
                return data;
              })
            );

            setCompleted(detailedData);
            console.log(detailedData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      searchPoke();
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <div>
      <form
        role="search"
        className="flex items-center w-full max-w-md mx-auto mt-4"
      >
        <input
          type="search"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
        />
      </form>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {completed?.map((pokemon) => (
            <Link 
              key={pokemon.id}
              to={`/detail/${pokemon.id}`}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold capitalize text-center">{pokemon.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
