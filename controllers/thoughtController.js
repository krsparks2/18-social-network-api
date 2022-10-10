const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')


module.exports = {
// Get all thoughts
    getThoughts(req, res) {
    Thought.find()
        .then((thoughts) => {res.json(thoughts)})       
        .catch(err => res.status(500).json(err))
    },
// Get one thought by id
    getSingleThought(req, res) {
        Thought.findById({_id: req.params.thoughtId})
        .then((user) => {res.json(user)})
        .catch(err => res.status(500).json(err))
    },
// Create/post one thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
// Delete one thought by id
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then(() => {res.json("Thought has been deleted.")})
        .catch((err) => res.status(500).json(err));
    },
// Update/put one thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {new: true}
        )
        .then(() => {res.json("Thought has been updated.")})
        .catch((err) => res.status(500).json(err));
    },

	// Create/post reaction
	createReaction( req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((thoughtData) => {
				if (!thoughtData) {
					res.status(404).json({ message: "No thought was found with this id." });
					return;
				}
				res.json(thoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},
	// Delete reaction
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } }  },
			{ new: true }
		)
			.then((thoughtData) => {
				if (!thoughtData) {
					res.json(404).json({ message: "No thought was found with this id." });
					return;
				}
				res.json(thoughtData);
			})
			.catch((err) => res.json(400).json(err));
	},
};
