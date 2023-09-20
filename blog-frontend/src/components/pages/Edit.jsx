import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm"
import { Petition } from "../../helpers/Petition";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";

export const Edit = () => {

  const [article, setArticle] = useState([]);
  const { formulario, cambiado } = useForm({});
  const [result, setResult] = useState("no_enviado");
  const { id } = useParams();

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = async () => {
    const { data } = await Petition(`${Global.url}article/${id}`, "GET");
    if (data.status === "success") {
      setArticle(data.article);
    }
  }

  const editArticle = async (e) => {
    e.preventDefault();
    /* Recoger datos del formulario */
    let article = formulario;
    /* Guardar articulo en el backend */
    const { data } = await Petition(`${Global.url}article/${id}`, "PUT", article);

    if (data.status === "success") {
      setResult("guardado");
    } else {
      setResult("error");
    }

    /* Subir imagen */
    const fileInput = document.querySelector("#file");
    if (data.status === "success" && fileInput.files[0]) {
      setResult("guardado");
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);
      const upload = await Petition(`${Global.url}upload-image/${data.article._id}`, "POST", formData, true);
      if (upload.data.status === "success") {
        setResult("guardado");
      } else {
        setResult("error");
      }
    }
  }

  return (
    <div className="jumbo">
      <h1>Editar articulo</h1>

      <strong>{result === "guardado" ? "Articulo guardado" : ""}</strong>
      <strong>{result === "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>
      <form className="formulario" onSubmit={editArticle}>
        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input type="text" name="title" onChange={cambiado} defaultValue={article.title} />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <textarea type="text" name="content" onChange={cambiado} defaultValue={article.content} />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <div className="mask">
            {article.image &&
              <img src={`${Global.url}image/${article.image}`} alt="image" />
            }
          </div>
          <input type="file" name="file0" id="file" defaultValue={article.image} />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  )
}
