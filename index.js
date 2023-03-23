const express = require("express");
const axios = require("axios");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/zipcode-api", async (req, res) => {
  const zipcode = req.query.zipcode;
  try {
    const response = await axios.get(
      `${process.env.SMARTYSTREETS_URL}lookup?&auth-id=${process.env.SMARTYSTREETS_ID}&auth-token=${process.env.SMARTYSTREETS_TOKEN}&zipcode=${zipcode}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response.status || 500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
