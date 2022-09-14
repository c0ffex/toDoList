/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-undef */
const express = require('express');

const app = express();

app.use(express.json());

checklistRouter = express.Router();

const Checklist = require('../models/checklist');

checklistRouter.get('/', async (req, res) => {
  try {
    const checklist = await Checklist.find();
    res.status(200).json(checklist);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

checklistRouter.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const checklist = await Checklist.create({ name });

    res.status(200).json(checklist);
  } catch (err) {
    res.status(422).json(err);
  }
});

checklistRouter.get('/:id', async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);
  try {
    res.status(200).json(checklist);
  } catch (err) {
    res.status(422).json(err);
  }
});

checklistRouter.put('/:id', (req, res) => {
  res.send(`put id: ${req.params.id}`);
});

checklistRouter.delete('/:id', (req, res) => {
  res.send(`delete id: ${req.params.id}`);
});
module.exports = checklistRouter;
