const fs = require('fs');
const path = require('path');
const { validate } = require('../helpers/validate');
const Article = require('../models/Article');

const add = async (req, res) => {

    /* Recoger parametros por post a guardar */
    let parameters = req.body;

    /* Validar datos */
    try {
        validate(parameters);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    /* Crear el objeto a guardar */
    const article = new Article(parameters);

    /* Asignar valores a objeto basado en el modelo (manua o automaticol */
    // article.title = parameters.title(); // Esto seria de forma manual

    /* Guardar el articulo en la base de datos */
    const articleSave = await article.save();

    /* Devolver resultado */
    return res.status(200).json({
        status: "success",
        article: articleSave
    });
}

const getArticles = async (req, res) => {
    let limit = req.params.limit;

    if (limit && isNaN(parseInt(limit))) {
        return res.status(400).json({
            status: "error",
            mensaje: "El valor de límite (limit) no es válido"
        });
    }

    let query = Article.find({}).sort({ date: -1 });

    if (limit) {
        query = query.limit(parseInt(limit));
    }

    const articles = await query.exec();

    if (!articles) {
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado artículos"
        });
    }

    return res.status(200).json({
        status: "success",
        articles: articles
    });
}

const show = async (req, res) => {
    /* Recoger un id por la URL */
    let id = req.params.id;

    /* Buscar el artículo de manera asincrónica */
    const article = await Article.findById(id).exec();

    /* Si no existe, devolver un error */
    if (!article) {
        return res.status(404).json({
            status: "error",
            mensaje: "No se ha encontrado el artículo"
        });
    }

    /* Devolver el resultado */
    return res.status(200).json({
        status: "success",
        article: article
    });

}

const remove = async (req, res) => {
    /* Recoger un id por la URL */
    let id = req.params.id;

    /* Buscar el artículo de manera asincrónica */
    const article = await Article.findOneAndDelete({ _id: id }).exec();

    /* Si no existe, devolver un error */
    if (!article) {
        return res.status(404).json({
            status: "error",
            mensaje: "No se ha encontrado el artículo"
        });
    }

    /* Devolver el resultado */
    return res.status(200).json({
        status: "success",
        mensaje: "Articulo eliminado",
        article: article
    });

}

const edit = async (req, res) => {
    /* Recoger un id por la URL */
    let id = req.params.id;

    /* Recoger datos del body */
    let parameters = req.body;

    /* Validar datos */
    try {
        validate(parameters);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    /* Buscar y actualizar articulo */
    const article = await Article.findOneAndUpdate({ _id: id }, parameters, { new: true }).exec();

    /* Si no existe, devolver un error */
    if (!article) {
        return res.status(404).json({
            status: "error",
            mensaje: "No se ha encontrado el artículo"
        });
    }

    /* Devolver el resultado */
    return res.status(200).json({
        status: "success",
        article: article
    });
}

const uploadImage = async(req, res) => {

    /* Configurar multer */

    /* Recoger el fichero de imagen subido */
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            mensaje: "Peticion invalida"
        });
    }

    /* Nombre del archivo */
    let file = req.file.originalname;

    /* Extension del archivo */
    let file_split = file.split("\.");
    let extension = file_split[1];

    /* Comprobar extension correcta */
    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {
        /* Borrar archivo y dar respuesta */
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: "error",
                mensaje: "Imagen invalida"
            });
        });
    } else {
        /* Recoger un id por la URL */
        let id = req.params.id;

        /* Buscar y actualizar articulo */
        const article = await Article.findOneAndUpdate({ _id: id }, {image: req.file.filename}, { new: true }).exec();

        /* Si no existe, devolver un error */
        if (!article) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el artículo"
            });
        }

        /* Si todo va bien, actualizar el articulo */

        // Devolver respuesta
        return res.status(200).json({
            status: "success",
            article: article
        });
    }
}

const image = (req, res) => {
    let file = req.params.file;
    let url = "./images/articles/" + file;
    fs.stat(url, (error, exist) => {
        if (exist) {
            return res.sendFile(path.resolve(url));
        } else {
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe",
                existe,
                file,
                url
            });
        }
    }) 
}

const search = async(req, res) => {
    /* Sacar el string de busqueda */
    let search = req.params.search;

    /* Find Or */
    const articles = await Article.find({ "$or": [
        { "title": { "$regex": search, "$options": "i" } },
        { "content": { "$regex": search, "$options": "i" } },
    ]}).sort({ date: -1 }).exec();

    if (!articles || articles.length <= 0) {
        return res.status(404).json({
            status: "error",
            mensaje: "No se han encontrado articulos"
        });
    }

    return res.status(200).json({
        status: "success",
        articles: articles
    });
}

module.exports = {
    add,
    getArticles,
    show,
    remove,
    edit,
    uploadImage,
    image,
    search
}
