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
    // sayfiqi
    <>
    <div>
    <form action="" className="flex justify-center items-center mt-2">
          <div>
            <input
              type="text"
              placeholder="seacrh pokemons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" px-2 py-2 rounded-full border-2 border-slate-800 focus:outline-blue-500 w-xl"
              aria
            />
          </div>
        </form>
      {/* kak z */}
      <div className="container justify-center mx-auto font-semibold capitalize">
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"> */}
        <div className="flex flex-wrap gap-2 justify-center items-center mt-4">
          {completed?.map((pokemon) => (
            <Link 
              key={pokemon.id}
              to={`/detail/${pokemon.id}`}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              {/* <h2 className="text-lg font-semibold capitalize text-center">{pokemon.name}</h2> */}
              <div className="bg-slate-800 shadow-xl/40 w-48 min-h-full rounded-xl">
        <div className="justify-center items-center h-auto">
          <img
            className="w-50 h-50"
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt=""
          />
        </div>
        <div className="text-2xl text-white text-center pt-0 pb-2">
          <p>{pokemon.name}</p>
        </div>
      </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    {/* ronald */}
    
  </>
  );
}

export default App;
