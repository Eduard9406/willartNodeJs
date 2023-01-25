// Packages
const express=require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const data_img = require('./datos.json')


// Use Packages
const app= express();
app.use(bodyParser.urlencoded({extend:true}));
app.set('view engine', 'ejs');

// Static Files
app.use(express.static("public"));

// Manejo de Peticiones HTTP
app.get("/", function(req , res){
  console.log()
let socialmedia= [{name:"Instagram", icon:"fab fa-instagram",hover:"insta",link:"https://www.instagram.com/wil_d94"},
                  {name:"LinkedIn", icon:"fab fa-linkedin",hover:"in",link:""},
                  {name:"Facebook", icon:"fab fa-facebook",hover:"fb",link:"https://www.facebook.com/profile"},
                  {name:"Twitter", icon:"fab fa-twitter",hover:"tw",link:"https://twitter.com/psantos9461"}];  


//Leer archivos
let files = fs.readdirSync("./public/images/portfolio");
let image=[];
      

for (let i=0;i<data_img.length;i++){
   image.push({url: "/images/portfolio/"+data_img[i].title+".jpeg" , title:data_img[i].title, clase:data_img[i].clase});
  //image.push({url: "/images/portfolio/"+files[i], title:"Title", clase:"semirealism"});
}
console.log(image)     
res.render("index",{socialmedia: socialmedia, image: image});
});

app.get('/commission', function(req, res) {
  res.render('commission');
});

app.get('/faq', function(req, res) {
  res.render('faq');
});

// Define Port Server
app.listen(3000, function(){
  console.log("Server Runnig");
});
