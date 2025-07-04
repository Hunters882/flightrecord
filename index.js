import express from "express";
import cors from "cors";
import Amadeus from "amadeus";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors()); // allow React to connect
app.use(express.json());

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

app.get("/api/flights", async (req, res) => {
  try {
    const { from, to, departureDate } = req.query;

    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: from,
      destinationLocationCode: to,
      departureDate,
      adults: 1,
      max: 5
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
