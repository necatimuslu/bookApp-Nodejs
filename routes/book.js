const router = require("express").Router();

const {
  bookList,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  uploadOption,
} = require("../controllers/bookController");

router.get("/", bookList);
router.get("/:id", getBookById);
router.post("/", uploadOption.single("image"), createBook);

router.put("/:id", uploadOption.single("image"), updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
