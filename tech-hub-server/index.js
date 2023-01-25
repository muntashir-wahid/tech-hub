const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const app = require("./app");

// START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Tech Hub server is listening on port ${PORT}`);
});
