const router = require("express").Router();

const { check } = require("express-validator");

const {
  categoriesList,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  getBooksCategoryId,
} = require("../controllers/categoryController");

router.get("/", categoriesList);
router.get("/:id", getCategoryById);
router.get("/book/:id", getBooksCategoryId);
router.post(
  "/",
  [check("name").notEmpty().withMessage("name alanı boş olamaz")],
  createCategory
);
router.put(
  "/:id",
  [check("name").notEmpty().withMessage("name alanı boş olamaz")],
  updateCategory
);
router.delete("/:id", deleteCategory);

module.exports = router;
