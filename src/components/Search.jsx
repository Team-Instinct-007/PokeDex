import React from 'react'
import useSearch from '../hooks/useSearch'

function Search() {
    const { search, setSearch, pokes, completed} = useSearch()
    
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
        {/* {completed?.map((poke) => {

        })} */}
      </div>
    </div>
  )
}

export default Search