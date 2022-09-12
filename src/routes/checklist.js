const express = require('express');

const app = express();

app.use(express.json());
router = express.Router();

router.get('/', (req, res) => {
  res.status(200)
  res.send('<h1>Hello World!</h1>')
})

router.post('/', (req, res) => {
  res.status(201).json(req.body)
})

router.get('/:id', (req, res) => {
  res.send(`id: ${req.params.id}`)
})

router.put('/:id', (req, res) => {
  res.send(`put id: ${req.params.id}`)
})

router.delete('/:id', (req, res) => {
  res.send(`delete id: ${req.params.id}`)
})
module.exports = router;