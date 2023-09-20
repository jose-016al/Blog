import { NavLink } from "react-router-dom"

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li><NavLink to="/home">Inicio</NavLink></li>
        <li><NavLink to="/articles">Articulos</NavLink></li>
        <li><NavLink to="/create-article">Crear</NavLink></li>
      </ul>
    </nav>
  )
}
