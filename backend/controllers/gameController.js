const Games = require("../models/games");
const User = require("../models/user");

const addGameToList = async (req, res) => {
        try {
          const { _id } = req.user;
          let owned = false
         
        const {name, id: gameId, cover, total_rating, genres, platforms, completed, first_release_date } = req.body.game
          const url = cover.url
        const image_id = cover.image_id
       
       
        const user = await User.findById(_id)
        if(!user) return res.status(422).send({error: 'Must be signed in'})
        const collectedGames = await user.populate('games')

        collectedGames.games.map(function(myGame) {
          if(myGame.gameId === gameId) {
          owned = true
            
          }
        })
        if(owned) return res.status(403).send({message: 'Already owned!'})
        const game = await Games.create({name, gameId, 'cover.url': url, first_release_date, cover_image_id: image_id, total_rating, platforms, genres, completed})
        const myGameID = game._id
      
        await game.save()
        user.games.push(myGameID)
        await user.save()
        return res.status(200).send({ user, message: 'Game added'});
      
        } catch (err) {
          console.log(err)
        }
}


const getAllGames = async (req, res) => {

    try {
      const { _id } = req.user;
      const user = await User.findById(_id).populate('games')
      const games = user.games
      return res.status(200).send(games);
  
    } catch(err) {
      return res.status(500).send({error: 'Server Error', err})
    }
}

module.exports = {
   getAllGames,
   addGameToList
  };