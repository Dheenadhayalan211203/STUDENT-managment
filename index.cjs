const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(bodyparser.json());
app.use(cors());

const port = 3;

const uri =
  "mongodb+srv://Dheena:dheena123@cluster0.ser6ewc.mongodb.net/MKCE?retryWrites=true&w=majority&appName=Cluster0";

async function connectDb() {
  try {
    await mongoose.connect(uri);
  } catch (e) {
    console.log("Error in connectiong DB :" + e);
  }
}

connectDb();

const std = new mongoose.Schema({
  id: Number,
  name: String,
  subject: String,
  mark: String,
});

const student = mongoose.model("Student", std);

app.post("/addmark", async (req, res) => {
  try {
    const { id, name, subject, mark } = req.body;
    const data = new student({ id, name, subject, mark });

    await data.save();
    res.json({ message: "Student mark Added" , status:"succesfull" });
  } catch (e) {
    console.log("Error : " + e);
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
