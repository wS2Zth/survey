const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı
mongoose.connect(
  "mongodb+srv://dbAdmin:dbPass@cluster0.ha93adj.mongodb.net/survey"
);

// MongoDB modeli
const SurveySchema = new mongoose.Schema({
  soru1: String,
  soru2: String,
  soru3: String,
  soru4: String,
  soru5: String,
  soru6: String,
  soru7: String,
  soru8: String,
  soru9: String,
});
const Survey = mongoose.model("Survey", SurveySchema);

// POST isteği için route
app.post("/send", async (req, res) => {
  try {
    const newSurvey = new Survey(req.body);
    await newSurvey.save();
    res.send({ res: "Yanıtınız kaydedildi" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/get-responses", async (req, res) => {
  try {
    const surveys = await Survey.find({});
    res.send(surveys);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Sunucuyu başlat
app.listen(3000, () => {
  console.log("Server 3000 portunda çalışıyor...");
});
