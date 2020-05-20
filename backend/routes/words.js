const router = require("express").Router();
let Word = require("../models/word.model"); //necesitamos el model que creamos

//se encarga de manejar los get request en el words url path
// localhost:5000/words/
// si es solo / es el get
router.route("/").get((req, res) => {
  Word.find() //retorna una promesa, los resultados son en json
    .then((words) => res.json(words)) //words son todos los usuarios que nos devolvio find
    //res.json(words) retornar words en json format
    .catch((err) => res.status(400).json("Error: " + err));
});

//se encarga de manejar los post request en el words url path
// localhost:5000/words/add  para el post, o agregar datos a la base de datos
router.route("/add").post((req, res) => {
  const word = req.body.word; //el valor que espera en el post
  //seria en formato json: "word" : "pato"
  const newWord = new Word({ word });

  newWord
    .save()
    .then(() => res.json("Word added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
