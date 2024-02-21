import {config} from 'dotenv'   
config()

import express from 'express';
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import YAML from 'yaml'
import morgan from 'morgan';
const app = express();

// swagger
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middleware 
app.use(express.json())
// TODO: replace winston logger
app.use(morgan("dev"))


app.get('/api/v1/health-check', (req, res) => {
    res.status(200).json({
        success: true, 
        message: "All Good :)"
    })
});

export default app
