import { useEffect, useState } from "react"
import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";
import { useParams } from "react-router-dom";

export const Article = () => {

  const { id } = useParams();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    const { data } = await Petition(`${Global.url}article/${id}`, "GET");
    if (data.status === "success") {
      setArticle(data.article);
    }
    setLoading(false);
  }

  return (
    <div className="jumbo">
      {loading ? "Cargando..." :
        <>
          <div className="mask">
            {article.image &&
              <img src={`${Global.url}image/${article.image}`} alt="image" />
            }
          </div>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          <span>{article.date}</span>
        </>
      }
    </div>
  )
}
