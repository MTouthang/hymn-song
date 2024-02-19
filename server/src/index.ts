import express from 'express';
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import YAML from 'yaml'


const app = express();


const PORT = process.env.PORT || 3000;

// swagger
const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Hello, TypeScript & Express..!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}....`);
});

