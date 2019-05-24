const request = require('supertest');
const Games = require('../games/gamesModel')
const db = require('../data/dbConfig');
const server = require('./server.js');  

describe('server.js', () => {
    // this test helps make sure we're working in the right testing environment
    it('should set the testing environment', () => {
      expect(process.env.DB_ENV).toBe('testing');
    })

    describe('endpoints', () => {
        describe('GET /', () => {

            beforeEach(async () => {
                await db('games').truncate();
              })
    
            it('should return 200 OK using async/await', async () => {
                const res = await request(server).get('/');
                expect(res.status).toBe(200);
            })
            
            it('should return a 200 status code AND a list of games', async () => {
                await Games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
                const res = await request(server).get('/games');
                expect(res.status).toBe(200);
                expect(res.body).toEqual([{title: 'Pacman', id: 1, genre: 'Arcade', releaseYear: 1980}])
            })
            
        })

        describe('POST /', () => {

            beforeEach(async () => {
                await db('games').truncate();
              })
    
            it('should validate that the required fields are included in the body and return a 422 if info is incomplete', async () => {
                
                const res = await request(server).post('/games').send({ title: "", genre: 'Arcade', releaseYear: 1980 })

                expect(res.status).toBe(422);
                expect(res.body).toEqual("Please provide a title and genre for the game")
            })

            it('should return a status code of 200 if a user puts in correct game data', async () => {
                
                const res = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

                expect(res.status).toBe(200);
            })
        })
    })
})