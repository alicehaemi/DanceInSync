const express = require('express');
const Audition = require('../models/audition');
const router = express.Router();

//retrieving all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Audition.findAll();
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//adding new entries
router.post('/', async (req, res) => {
  try {
    const {
        PUID,
        Years_experience,
        Song_genre,
        Duration,
        pre_placement,
        final_placement } = req.body;
    const entry = await Audition.create({
        PUID,
        Years_experience,
        Song_genre,
        Duration,
        pre_placement,
        final_placement
    });
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/presp', async (req, res) => {
  //console.log("in here");

  try {
    // Call the stored procedure using sequelize.query
    const results = await Audition.sequelize.query('CALL preplacement_get()');

    console.log('Stored procedure results:', results); // Add logging here

    res.json(results); // Assuming your stored procedure returns JSON data
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/finalsp', async (req, res) => {
  //console.log("in here");

  try {
    // Call the stored procedure using sequelize.query
    const results = await Audition.sequelize.query('CALL finalplacement_get()');

    console.log('Stored procedure results:', results); // Add logging here

    res.json(results); // Assuming your stored procedure returns JSON data
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { PUID,
      Years_experience,
      Song_genre,
      Duration,
      pre_placement,
      final_placement } = req.body;
    console.log(id);

    const entry = await Audition.findByPk(id);
    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    //console.log("\nfound it!!!\n")

    await entry.update({
      PUID,
        Years_experience,
        Song_genre,
        Duration,
        pre_placement,
        final_placement
    });

    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const entry = await Audition.findByPk(id);
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