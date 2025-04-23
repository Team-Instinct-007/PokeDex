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
          if (search){
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
            setPokes(data)
            console.log(pokes)
          } else {
            const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            setPokes(data)
            console.log(pokes)
          }
        } catch (error) {
          console.log(error)
        } finally {
          setTimeout(() => {}, 500)
        }
      }
      searchPoke()
      clearTimeout(debounce)
    }, 500)
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
