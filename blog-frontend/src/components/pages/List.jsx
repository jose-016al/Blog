import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Petition } from "../../helpers/Petition";

export const List = ({ articles, setArticles }) => {

    const remove = async (id) => {
        const { data } = await Petition(`${Global.url}/article/${id}`, "DELETE");

        if (data.status === "success") {
            setArticles(articles.filter(article => article._id !== id));
        }
    }

    return (
        articles.map(article => {
            return (
                <article key={article._id} className="article-item">
                    <div className="mask">
                        {article.image &&
                            <img src={`${Global.url}image/${article.image}`} alt="image" />
                        }
                    </div>
                    <div className="data">
                        <h3 className="title">
                            <Link to={`/article/${article._id}`}>
                                {article.title}
                            </Link>
                        </h3>
                        <p className="description">{article.content}</p>

                        <Link to={`/edit/${article._id}`} className="edit">
                            Editar
                        </Link>
                        <button className="delete" onClick={() => {
                            remove(article._id);
                        }}>Borrar</button>
                    </div>
                </article>
            );
        })
    )
}
