const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./images/articles");
    },
    filename: function(req, file, cb) {
        cb(null, "article" + Date.now() + file.originalname);
    }
});

const uploads = multer({storage: storage});

const ArticleController = require("../controllers/article");

/* Rutas de pruebas */
router.post("/add", ArticleController.add);
router.get("/articles/:limit?", ArticleController.getArticles);
router.get("/article/:id", ArticleController.show);
router.delete("/article/:id", ArticleController.remove);
router.put("/article/:id", ArticleController.edit);
router.post("/upload-image/:id", [uploads.single("file0")], ArticleController.uploadImage);
router.get("/image/:file", ArticleController.image);
router.get("/search/:search", ArticleController.search);

module.exports = router;