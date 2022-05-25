console.clear();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

/* let conectar = async () =>
  await mongoose.connect(
    "mongodb://localhost:27017/OrangeTv",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("conectado");
    }
  );

conectar(); */

let conectar = async () =>
  await mongoose.connect(
    `mongodb+srv://${user}:${pass}@cluster0.yrjoi.mongodb.net/${bbdd}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("conectado");
    }
  );

conectar();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//Sliders
let sliderSchema = new mongoose.Schema(
  { titulo: String, slides: Array, filtro:String },
  { collection: "sliders" }
);

const Slider = mongoose.model("Slider", sliderSchema);



app.get("/Slider", async (req, res) => {
  const buscar = await Slider.find().lean();
  const peliculas = await Peliculas.find().lean();
  buscar.map((cadaslider)=>{
    if(cadaslider.filtro == ""){
      cadaslider.slides=peliculas
    }else{
      cadaslider.slides=peliculas.filter(cadapeli => cadapeli.tipo == cadaslider.filtro)
    }
    
  })
  peliculas.map((cadapelicula)=>{
      console.log(cadapelicula.tipo)
  })

  res.status(200).json({
    data: buscar,
    msj: "GET en inicio",
  });
});
//Destacados
let destacadosSchema = new mongoose.Schema(
  {
    numero: Number,
    imagen: String,
    titulo: String,
    ano: Number,
    edad: String,
    edad2: String,
    duracion: String,
    href: String,
    descripcion: String,
  },
  { collection: "destacados" }
);

const Destacados = mongoose.model("Destacados", destacadosSchema);



app.get("/Destacados", async (req, res) => {
  const buscar = await Destacados.find();

  res.status(200).json({
    data: buscar,
    msj: "GET en inicio",
  });
});

//peliculas
let peliculasSchema = new mongoose.Schema(
  {
    nombre: String,
    img: String,
    tipo: String,
    ano: Number,
    edad: String,
    duracion: String,
    idiomas: String,
    imgrande: String,
    subtitulos: String,
    href: String,
    descripcion: String,
    pago: Boolean,
  },
  { collection: "peliculas" }
);

const Peliculas = mongoose.model("Peliculas", peliculasSchema);



app.get("/Peliculas", async (req, res) => {
  const buscar = await Peliculas.find();

  res.status(200).json({
    data: buscar,
    msj: "GET en inicio",
  });
});

app.listen(5000, () => {
  console.log("iniciando");
});
