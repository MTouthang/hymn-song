import dbConnection from "./config/db.config";
import app from "./app"


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}....`);
  dbConnection()
});
