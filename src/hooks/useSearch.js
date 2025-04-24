import React from 'react'

function useSearch() {
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

      return {search, setSearch, pokes, completed}
}

export default useSearch