const express= require("express")
const db = require('../data/dbConfig');
const server=express();

const games = require('../games/gamesModel')

server.use(express.json());

server.get('/',async(req,res)=>{
  res.status(200).json({api:'up'})
})

server.get('/games', async (req, res) => {
    const gameList = await games.getAll();
    console.log("Games list", gameList)
    res.status(200).json(gameList);
  });
  
  server.post('/games', (req, res) => {
    const { title, genre } = req.body
    if(!title || !genre) {
      res.status(422).json("Please provide a title and genre for the game");
      return;
    }
    db('games').insert(req.body, 'id')
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({error: err})
    })
  })
module.exports=server