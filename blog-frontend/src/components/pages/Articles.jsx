import { useEffect, useState } from "react"
import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";
import { List } from "./List";

export const Articles = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    const { data } = await Petition(`${Global.url}articles`, "GET");
    if (data.status === "success") {
      setArticles(data.articles);
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
