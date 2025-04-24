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
    <>
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
    <div className="container mx-auto font-serif">
    {/* navbar */}
    <div className="flex items-center justify-center mt-2.5 rounded-md shadow-md">
      <div className="my-10 px-5">
        <h1 className="text-2xl font-bold">PoKéMoN</h1>
      </div>
      <div>
        <form action="" className="flex">
          <div>
            <input
              type="text"
              placeholder="seacrh pokemons..."
              className=" px-2 py-2 rounded-full border-2 border-sky-400 focus:outline-blue-500"
            />
          </div>
          <div className="px-4">
            <button
              type="submit"
              className="bg-sky-300 rounded-full px-2 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* navbar end */}

    {/* content */}
    <div className="flex flex-wrap  gap-2 justify-center items-center mt-4">
      <div className="bg-slate-800 shadow-xl/40 w-48 h-auto rounded-xl">
        <div className="justify-center items-center h-auto">
          <img
            className="w-50 h-50"
            src="https://cdn.pixabay.com/photo/2021/12/26/17/31/pokemon-6895600_1280.png"
            alt=""
          />
        </div>
        <div className="text-2xl text-white text-center pt-0 pb-2">
          <p>Bulbasaur</p>
        </div>
      </div>

      <div className="bg-slate-800 shadow-xl/40 w-48 h-auto rounded-xl">
        <div className="items-center justify-center ">
          <img
            className="w-50 h-50"
            src="https://cdn.pixabay.com/photo/2021/12/26/17/31/pokemon-6895600_1280.png"
            alt=""
          />
        </div>
        <div className="text-2xl text-white text-center pt-0 pb-2">
          <p>Bulbasaur</p>
        </div>
      </div>

      <div className="bg-slate-800 shadow-xl/40 w-48 h-auto rounded-xl">
        <div className="items-center justify-center ">
          <img
            className="w-50 h-50"
            src="https://cdn.pixabay.com/photo/2021/12/26/17/31/pokemon-6895600_1280.png"
            alt=""
          />
        </div>
        <div className="text-2xl text-white text-center pt-0 pb-2">
          <p>Bulbasaur</p>
        </div>
      </div>

      <div className="bg-slate-800 shadow-xl/40 w-48 h-auto rounded-xl">
        <div className="items-center justify-center ">
          <img
            className="w-50 h-50"
            src="https://cdn.pixabay.com/photo/2021/12/26/17/31/pokemon-6895600_1280.png"
            alt=""
          />
        </div>
        <div className="text-2xl text-white text-center pt-0 pb-2">
          <p>Bulbasaur</p>
        </div>
      </div>

      <div className="bg-slate-800 shadow-xl/40 w-48 h-auto rounded-xl">
        <div className="items-center justify-center ">
          <img
            className="w-50 h-50"
            src="https://cdn.pixabay.com/photo/2021/12/26/17/31/pokemon-6895600_1280.png"
            alt=""
          />
        </div>
        <div className="text-2xl text-white text-center pt-0 pb-2">
          <p>Bulbasaur</p>
        </div>
      </div>
    </div>
    {/* content end */}

    {/* details */}
    <div className=" m-4">
      <div className="flex gap-4 items-center justify-around bg-slate-500 ">
        <div>
          <p className="text-3xl">Bulbasaur</p>
          <p>ID : 6</p>
          <p>Height : 17</p>
          <p>Weight : 905</p>
        </div>
        <div className="flex items-center justify-center h-80">
          <img
            src="https://pokemon-img.pages.dev/600x600/1.webp"
            alt=""
            className="w-60 h-60"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <div className="bg-slate-500 w-md rounded-lg">
          <ul className="m-4">
            <li>Generation : I</li>
            <li>Habitat : Grassland</li>
            <li>Capture Rate : 45</li>
            <li>Growt Rate : Medium-Slow</li>
            <li>Base Exp : 64</li>
            <li>Base Happiness : 50</li>
            <li>EV Yield : 1 Sp. Attack</li>
          </ul>
        </div>
        <div>
          <div className="bg-slate-500 w-md rounded-lg">
            <h1 className="m-2 text-2xl">Stats</h1>
            <ul className="m-4 py-3">
              <li>HP</li>
              <li>Attack</li>
              <li>Defense</li>
              <li>Sp Attack</li>
              <li>Sp Defense</li>
              <li>Speed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}

export default App;
