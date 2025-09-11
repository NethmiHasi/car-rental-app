const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT 

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));