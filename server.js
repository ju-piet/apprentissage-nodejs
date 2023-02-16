const express = require('express')  //Récupération du moodule express
const {success, getUniqueId } = require('./helper') //Déstructuration
const morgan = require('morgan')
const favicon = require('serve-favicon')
let pokemons = require('./mock-pokemon')

const app = express()   //Création d'une instance d'express
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))  //<=== Différents types de log

app.get('/', (req, res) => res.send('Hello, Express 2 !')) 

app.get('/api/pokemons', (req, res) => {
    const message = "La liste des pokémons a bien été trouvé !"
    res.json(success(message, pokemons))
})

app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const message = "Un pokémon a bien été trouvé !"
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.json(success(message, pokemon))
})

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = {...req.body, ...{id : id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée !`
    res.json(success(message, pokemonCreated))
})

app.listen(port, () => console.log(`Notre appli Node est démarré sur : http://localhost:${port}`))