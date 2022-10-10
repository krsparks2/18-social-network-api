const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')


module.exports = {
    getThoughts(req, res) {
    Thought.find()
        .then((thoughts) => {res.json(thoughts)})       
        .catch(err => res.status(500).json(err))
    },
    getSingleThought(req, res) {
        Thought.findById({_id: req.params.thoughtId})
        .then((user) => {res.json(user)})
        .catch(err => res.status(500).json(err))
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then(() => {res.json("Thought has been deleted.")})
        .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {new: true}
        )
        .then(() => {res.json("Thought has been updated.")})
        .catch((err) => res.status(500).json(err));
    },

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
