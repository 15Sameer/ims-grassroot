const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.post("/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(500).send("Error adding item");
  }
});

router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.send(items);
  } catch (err) {
    res.status(500).send("Error fetching items");
  }
});

module.exports = router;
