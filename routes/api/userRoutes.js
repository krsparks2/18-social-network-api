const router = require("express").Router();

const {
    allUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addNewFriend,
    removeFriend
} = require("../../controllers/UserController");

router.route("/").get(allUsers).post(createUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addNewFriend).delete(removeFriend);

module.exports = router;