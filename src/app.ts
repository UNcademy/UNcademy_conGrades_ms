import express  from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/routes"

//Initialization
const app = express();

//Configuration
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//Routes
app.get('/', (req,res) => {
    res.send(`La API está en http://localhost:${app.get('port')}`);
});

app.use(routes)

export default app;