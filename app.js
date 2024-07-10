//creation serveur nodejs avec express
const cors = require('cors');
const express=require("express")
const dotenv= require("dotenv")
// declare une instance de pakage expresse
const app=express()
app.use(cors({
    origin: '*'
    // origin: 'http://localhost:3000' // Ou '*' pour permettre l'accès à partir de n'importe quel domaine
  }));
const categorieRouter =require("./routes/categorie.route")
const scategorieRouter =require("./routes/scategorie.route")
const articleRouter =require("./routes/article.route")

const mongoose=require("mongoose")//odm object document mapping
dotenv.config()
app.use(express.json()) //Middlware pour comprendre fichier json
app.get("/",(req,res)=> { res.send("bienvenue dans notre site")})//root


//pour executer au niveau terminal exécuter (nodemon app)
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD,{useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); });
app.use('/api/categories', categorieRouter);
app.use('/api/scategories', scategorieRouter);
app.use('/api/articles', articleRouter);
app.listen(process.env.PORT)
console.log("pplication run at port" + process.env.PORT)
module.exports = app;