const express = require('express');
const Person = require('../models/person');
const router = express.Router();

//retrieving all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Person.findAll();
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//adding new entries
router.post('/', async (req, res) => {
  // console.log("in server");
  // console.log(req.body);
  
  try {
    const { PUID,
        Name,
        Email,
        Year } = req.body;
    const entry = await Person.create({
        PUID,
        Name,
        Email,
        Year
    });
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

//update person entry!! (req = request. :/id is a parameter that is identified in the req)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Email, Year } = req.body;

    const entry = await Person.findByPk(id);
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    // console.log("\nfound it!!!\n")

    await entry.update({
      Name,
      Email,
      Year
    });

    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

//
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Person.findByPk(id);
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    // bombs away captain... bombs away...
    await entry.destroy();

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});


module.exports = router;