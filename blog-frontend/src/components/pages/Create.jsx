import { useState } from "react";
import { useForm } from "../../hooks/useForm"
import { Petition } from "../../helpers/Petition";
import { Global } from "../../helpers/Global";

export const Create = () => {

  const { formulario, cambiado } = useForm({});
  const [result, setResult] = useState("no_enviado");

  const createArticle = async (e) => {
    e.preventDefault();
    /* Recoger datos del formulario */
    let article = formulario;
    /* Guardar articulo en el backend */
    const { data } = await Petition(`${Global.url}add`, "POST", article);

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
      <h1>Crear articulo</h1>

      <strong>{result === "guardado" ? "Articulo guardado" : ""}</strong>
      <strong>{result === "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>
      <form className="formulario" onSubmit={createArticle}>
        <div className="form-group">
          <label htmlFor="title">Titulo</label>
          <input type="text" name="title" onChange={cambiado} />
        </div>

        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <textarea type="text" name="content" onChange={cambiado} />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id="file" />
        </div>

        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  )
}
