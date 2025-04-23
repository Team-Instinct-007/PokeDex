import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [pokes, setPokes] = useState([])

  useEffect(() => {
    const debounce = setTimeout(async () => {
      const searchPoke = async () => {
        try {
          const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
          const allPokes = data.results;
          if (search) {
            const filtered = allPokes.filter(poke =>
              poke.name.toLowerCase().includes(search.toLowerCase())
            );
            setPokes(filtered);
            console.log(filtered)
          } else {
            setPokes(allPokes); // default, kalau search kosong
            console.log(allPokes)
          }
        } catch (error) {
          console.log(error)
        } 
      }
      searchPoke()
      
    }, 500)
    return () => clearTimeout(debounce)

  }, [search])
  

  return (
    <div>
      <form role='search' className="flex items-center w-full max-w-md mx-auto mt-4">
        <input
          type="search"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label='Search'
        />
      </form>

      <div>
        {/* {pokes?.map((poke) => {

        })} */}
      </div>
    </div>
  )
}

export default App
