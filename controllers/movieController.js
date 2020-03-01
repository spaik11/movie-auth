const Movie = require('../models/Movies');

module.exports = {
    home: (req, res) => {
        if (!req.isAuthenticated()) return res.render('error');
        return res.render('main/movieHome');
    },

    getAddMovie: (req, res) => {
        res.render('main/addMovie');
    },

    viewMovie: (req, res) => {
        Movie.find({})
            .then((movies) => res.render('main/getMovies', { movies }))
            .catch((err) => res.status(500).json({ message: 'Server error', err }));
    },

    findMovie: (req, res) => {
        res.render('main/findMovie', { title: null });
    },

    foundMovie: (req, res) => {
        Movie.findOne({ title: req.query.title })
        .then((title) => {
            if (title) {
                return res.render('main/findMovie', { title });
            } else {
                return res.status(400).json({ message: 'There is no movie with that title' });
            }
        })
        .catch((err) => res.status(500).json({ message: 'Server error', err}));
    },

    addMovie: (req, res) => {
        const { title, rating, synopsis, releaseYear, genre, director, boxOffice, image } = req.body;

        if (!title 
            || !rating 
            || !synopsis
            || !releaseYear
            || !genre
            || !director
            || !boxOffice
                ) return res.status(400).json({ message: 'Please fill out the entire form' });

        Movie.findOne({ title })
        .then((movieTitle) => {
            if (movieTitle) return res.status(500).json({ message: 'The movie title already exists' })

            const newMovie = new Movie();
            newMovie.title = title;
            newMovie.rating = rating;
            newMovie.synopsis = synopsis;
            newMovie.releaseYear = releaseYear;
            newMovie.genre = genre.join(',').toLowerCase().split(',');
            newMovie.director = director;
            newMovie.boxOffice = boxOffice;
            newMovie.image = image;

            newMovie
                .save()
                .then((movie) => res.status(200).json({ message: 'The new movie was added', movie}))
                .catch((err) => res.status(500).json({ message: 'Movie was not created', err }))
        })
        .catch((err) => res.status(500).json({ message: 'Server error', err}))
    },

    updateMovie: (req, res) => {
        Movie.findOne({ title: req.params.title })
        .then((movie) => {
            const { title, rating, synopsis, releaseYear, genre, director, boxOffice, image } = req.body;

            if (movie) {
                movie.title = title ? title : movie.title;
                movie.rating = rating ? rating : movie.rating;
                movie.synopsis = synopsis ? synopsis : movie.synopsis;
                movie.releaseYear = releaseYear ? releaseYear : movie.releaseYear;
                movie.genre = genre ? genre.join(',').toLowerCase().split(',') : movie.genre;
                movie.director = director ? director : movie.director;
                movie.boxOffice = boxOffice ? boxOffice : movie.boxOffice;
                movie.image = image ? image : movie.image;
                
            movie
                .save()
                .then((updated) => res.status(200).json({ message: 'Movie updated', updated }))
            } else {
                return res.status(200).json({ message: 'Cannot find movie' });
            };
        })
        .catch((err) => res.status(500).json({ message: 'Server error', err }));
    },

    deleteMovie: (req, res) => {
        Movie.findOneAndDelete({ title: req.params.title })
            .then((movie) => {
                if (movie) {
                    return res.status(200).json({ message: 'Movie is deleted', movie });
                } else {
                    return res.status(200).json({ message: 'Cannot find movie' });
                }
            })
            .catch((err) => res.status(400).json({ message: 'Movie not deleted', err }));
        }
};
