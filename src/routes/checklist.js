/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-undef */
const express = require('express');

const app = express();

app.use(express.json());

checklistRouter = express.Router();

const Checklist = require('../models/checklist');

checklistRouter.get('/', async (req, res) => {
  try {
    const checklists = await Checklist.find();
    res.status(200).render('checklists/index', {checklists});
  } catch (err) {
    res.status(500).render('pages/error', {error: 'error on rendering checklists'});
  }
});

checklistRouter.get('/new', async (req, res) => {
  try {
    const checklist = new Checklist();
    res.status(200).render('checklists/new', { checklist: checklist })
  } catch (err) {
    res.status(500).render('pages/error', { error: 'Error on loading the page' })
  }
})

checklistRouter.get('/:id/edit', async(req, res) =>{
  try{
    const checklist = await Checklist.findById(req.params.id)
    res.status(200).render('checklists/edit', {checklist: checklist})
  } catch (err) {
    res.status(500).render('pages/error', {error: 'error on rendering tasks'});
  }
})

checklistRouter.post('/', async (req, res) => {
  const { name } = req.body.checklist;
  const checklist = new Checklist({name})

  try {
    await checklist.save()
    res.redirect('/checklists');
  } catch (err) {
    res.status(422).render('checklists/new', { checklists: { ...checklist, err}});
  }
});

checklistRouter.get('/:id', async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);
  try {
    res.status(200).render('checklists/show', {checklist});
  } catch (err) {
    res.status(422).render('pages/error', {error: 'error on rendering tasks'});
  }
});

checklistRouter.put('/:id', async (req, res) => {
  const { name } = req.body;
  const checklist = await Checklist.findByIdAndUpdate(req.params.id)
  try {
    await checklist.update({name})
    res.status(200).redirect('/checklists')
  } catch (error) {
    const errors = error.error
    res.status(422).render('checklist/edit', {checklist: {...checklist, errors}})
  }
});

checklistRouter.delete('/:id/delete', async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);
  try {
    const checklist = await Checklist.findByIdAndDelete(checklist);
    res.status(200).redirect('/');
  } catch (err) {
    res.status(422).json(err);
  }
});
module.exports = checklistRouter;
