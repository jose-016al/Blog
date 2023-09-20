import { useEffect, useState } from "react"
import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";
import { List } from "./List";
import { useParams } from "react-router-dom";

export const Search = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const {search} = useParams();

  useEffect(() => {
    getArticles();
    console.log(search);
  }, []);

  useEffect(() => {
    getArticles();
    console.log(search);
  }, [search]);

  const getArticles = async () => {
    const { data } = await Petition(`${Global.url}search/${search}`, "GET");
    if (data.status === "success") {
      setArticles(data.articles);
    } else {
      setArticles([]);
    }
    setLoading(false);
  }

  return (
    <>
      {loading ? "Crgando..." :
        articles.length >= 1 ? <List articles={articles} setArticles={setArticles} /> : <h1>No hay articulos</h1>
      }
    </>
  )
}
