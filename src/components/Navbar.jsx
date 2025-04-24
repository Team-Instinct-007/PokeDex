import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">PokeDex</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/favorite" className="text-white hover:text-gray-300">Favorite</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar