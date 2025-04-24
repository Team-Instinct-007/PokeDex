function App() {
  return (
    <>
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
