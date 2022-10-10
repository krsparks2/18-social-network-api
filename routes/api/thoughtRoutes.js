const router = require("express").Router();

const {
    getAllThoughts,
    getSingleThought,
    newThought,
    editThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require("../../controllers/ThoughtController");

router.route("/").get(getAllThoughts).post(newThought);

router.route("/:thoughtId").get(getSingleThought).put(editThought).delete(deleteThought)

router.route("/:thoughtId/reactions").post(newReaction)

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction)

module.exports = router;