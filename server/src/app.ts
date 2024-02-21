import {config} from 'dotenv'   
config()

import express from 'express';
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import YAML from 'yaml'
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware';
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

// CatchAll - 404
app.all('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: `Not Found - ${req.method} ${req.originalUrl}`,
    });
  });
  
  // Custom error middleware
  app.use(errorMiddleware);

export default app
