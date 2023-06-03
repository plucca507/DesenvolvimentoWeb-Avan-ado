require('./mongodb')
const movieModel = require('../models/movieModel')
const movies = require('./movies.json')
const users = require('./users.json')

async function carregarDados() {
    try {
        await movieModel.deleteMany({});
        for (const movie of movies) {
            await movieModel.create(movie);
        }
        console.log('Carga de filmes feita!')
    } catch (error) {
        console.error(error)
    } finally {
        process.exit()
    }
}

carregarDados()