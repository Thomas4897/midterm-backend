const Movie = require('../model/Movies');

// Middleware can be a Function;
// Happens between the request and the response;

const createMovie = async (req, res) => {

    try {
        const { title, director, runtime, rating, description } = req.body;

        // Validate User Info -> Moved to lib folder

        // Creating a New User Object;
        let newMovie = new Movie({
            title: title,
            director: director,
            runtime: runtime,
            rating: rating,
            description: description,
        });

        // Use .save() to save new user object to DB
        let savedMovie = await newMovie.save();

        res.status(200).json({
            message: "New movie has been saved",
            payload: savedMovie,
        });

    } catch (error) {
        let errorKey = Object.keys(error.keyValue);
        let errorValue = Object.values(error.keyValue);
    
        if (error.code === 11000) {
            res.status(500).json({
                message: "Error",
                error: `${errorKey} ${errorValue} is already in use`
            });
        } else {
            res.status(500).json({
                message: "Error",
                error: error.keyValue
            });
        }
    }

};

const getAllMovies = async (req, res) => {
    let allMovies = await Movie.find();
    
    try {
        res.status(200).send(allMovies);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getOneMovie = async (req, res) => {

    try {
        const { id } = req.body;
        let oneMovie = await Movie.findById( id );
        console.log(id)

        if (oneMovie === null) {
            throw new Error("No movie of id is found, can't get movie");
        }
        res.status(200).json(oneMovie);

    } catch (err) {
        res.status(500).json(err);
    }

};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.body;
        let updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true })

        if(updatedMovie === null) {
            throw Error("No movie of id is found, cannot update")
        }
        res.status(200).json({
            message: "Movie updated",
            game: updatedMovie
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: "Error", 
            error: error.message 
        });
    }

};

const deleteMovie = async (req, res) => {

    try {
        const { id } = req.body;
        let deletedMovie = await Movie.findByIdAndDelete(id);

        if (deletedMovie === null) {
            throw new Error("No movie of id is found, can't delete");
        }

        res
            .status(200)
            .json(deletedMovie);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "there's an error",
            error: error.message,
        });
    }
}

module.exports = {
    createMovie,
    getAllMovies,
    getOneMovie,
    updateMovie,
    deleteMovie
};