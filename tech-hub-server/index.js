const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const app = require("./app");

// DATABASE CONNECTION
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.utstxjg.mongodb.net/tech-hub?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("Cant connect to database"));
// START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Tech Hub server is listening on port ${PORT}`);
});
