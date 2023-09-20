import { useNavigate } from "react-router-dom";

export const Sidebar = () => {

  const navigate = useNavigate();

  const searching = e => {
    e.preventDefault();
    navigate(`/search/${e.target.search_field.value}`);
  }

  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Buscador</h3>
        <form onSubmit={ searching }>
          <input type="text" name="search_field" />
          <input type="submit" id="search" value="Buscar" />
        </form>
      </div>
    </aside>
  )
}
