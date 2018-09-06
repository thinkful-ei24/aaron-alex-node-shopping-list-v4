'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {Recipes} = require('../models');


const jsonParser = bodyParser.json();
const router = express.Router();



router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['name', 'ingredients', 'id'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing ${field} in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
    if (req.params.id !== req.body.id) {
      const message = `The request params id ${req.params.id} does not match the body id ${req.body.id}`;
      console.error(message);
      return res.status(400).send(message);
    }
  
    Recipes.update({
      id: req.params.id,
      name: req.body.name,
      ingredients: req.body.ingredients
    });
    console.log(`Updated item ${req.params.id}`);
    res.status(204).end();
  }
});


router.get('/', (req, res) => {
  res.json(Recipes.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['name', 'ingredients'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = Recipes.create(req.body.name, req.body.ingredients);
  res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
  Recipes.delete(req.params.id);
  console.log(`Deleted recipe \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = {router};