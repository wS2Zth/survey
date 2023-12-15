// Eğitim İçeriği Hakkında Genel Görüşler:

// Bu eğitimden genel olarak memnun kaldınız mı?                                    [Radio Button] | Evet - Eh İşte - Hayır
// Eğitimin içeriği beklentilerinizi karşıladı mı?                                  [Radio Button] | Evet - Bilemiyorum Altan - Hayır
// Sunulan bilgilerin güncel ve ilgili olup olmadığı hakkında ne düşünüyorsunuz?    [Radio Button] | Güncel - Güncel Değil

// ##################################################

// Öğretim Yöntemleri ve Sunum:

// Eğitmenin öğretim tarzını nasıl buldunuz? (Ör: açık, anlaşılır, etkileşimli)             [Dropdown] | Olması gerektiği gibi - Bir şeyler anlattı işte - Ben daha iyi anlatırdım
// Sunulan örnekler ve uygulamalar konuları anlamanıza yardımcı oldu mu?                    [Dropdown] | Yardımcı Oldu - Ay ben bilemedim ama - Hiç dinlemeseydim daha iyiydi
// Eğitmenin soru-cevap bölümlerini yürütme şeklini nasıl değerlendirirsiniz?               [Dropdown] | Cevap verdi ve anladım - Cevap verdi ama yani hiç anlamadım - Cevap vermese daha iyiydi

// Bireysel Gelişim ve Öğrenme:

// Bu eğitimin JavaScript konusundaki bilginizi ve becerinizi nasıl etkilediğini düşünüyorsunuz?    [Input]
// Eğitimden aldığınız bilgileri pratikte uygulama imkanınız oldu mu?                               [Input]

// Yorum
// Eğitim hakkında ekstra belirtmek istediğiz bir şey var mı?                                       [Textarea]

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
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
