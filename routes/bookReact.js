const router = require("express").Router();

const bookController = require("../controllers/bookReact");

router.post("/", bookController.createReactBook);

router.put("/:id", bookController.updateReactBook);

module.exports = router;
