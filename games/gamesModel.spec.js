const db = require('../data/dbConfig');
const Games = require('./gamesModel');

describe('games model', () => {

 describe('insert()', () => {

   beforeEach(async () => {
     await db('games').truncate();
   })

   it('should insert the a game into the db', async () => {
     await Games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

     const games = await db('games'); // returns array of names
     expect(games).toHaveLength(1);
   })

   it('should insert the provided game into the db', async () => {
    let game = await Games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
    expect(game.title).toBe('Pacman');

    game = await Games.insert({  title: 'XCOM', genre: 'Strategy', releaseYear: 1994});
    expect(game.title).toBe('XCOM');
  })
 })

 describe('getAll()', () => {
    beforeEach(async () => {
        await db('games').truncate();
      })

    it('should retrieve all the games in the database', async () => {
        await Games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
        await Games.insert({  title: 'XCOM', genre: 'Strategy', releaseYear: 1994});

        let games = await Games.getAll();
        expect(games).toHaveLength(2);
        await Games.insert({  title: 'XCOM: Enemy Unknown', genre: 'Strategy', releaseYear: 2012});
        games = await Games.getAll();
        expect(games).toHaveLength(3);
    })

    it('should return an empty array when there are no games in the db', async () => {

        let games = await Games.getAll();
        expect(games).toHaveLength(0);
        expect(games).toEqual([])
    })
 })
 
})