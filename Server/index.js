const express = require("express");
const mongoose = require("mongoose");
const productDetails = require("../Server/productDetails.js");

const app = express();
app.use(express.json());
const api =
  "mongodb+srv://tulasi_bora_1234:S7c0MUT85a81tEtT@cluster0.hls0ugd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//S7c0MUT85a81tEtT
//tulasi_bora_123

mongoose
  .connect(api)
  .then(() => {
    console.log("db connected successfull");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(4000, () => {
  console.log("server is runnning 4000");
});

app.get("/", async (req, res) => {
  try {
    const data = await productDetails.find();
    console.log(data);
    res.status(200).json({ data: data, message: "Successfully Get the Data" });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productDetails.findById(id);
    res
      .status(200)
      .json({ product: product, message: "successfully get Single User Data" });
  } catch (error) {
    console.log(error.message);
  }
  s;
});

app.post("/", async (req, res) => {
  try {
    const { id, name } = req.body;
    console.log(req.body);
    const newProduct = new productDetails({
      id: id,
      name: name,
    });
    await newProduct.save();
    return res.json(await productDetails.find());

    //   res.status(200).json({ message: "successfully added a new userData" });
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productDetails.findById(id);
    product.name = req.body.name;
    product.id = req.body.id;
    await product.save();
    res.status(200).json({ message: "successfully updated userData" });
  } catch (error) {
    console.log(error.message);
  }
});
