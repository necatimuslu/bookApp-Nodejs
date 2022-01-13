const { Category } = require("../models/category");
const { validationResult } = require("express-validator");
const { Book } = require("../models/book");
exports.categoriesList = async (req, res) => {
  try {
    const categoriesList = await Category.find({});

    if (!categoriesList)
      return res.status(400).json({ message: "categories list not found" });
    res.status(200).send(categoriesList);
  } catch (error) {
    console.log(error);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const getCategoryById = await Category.findById(req.params.id);

    if (!getCategoryById)
      return res.status(400).json({ message: "category not found" });
    res.status(200).send(getCategoryById);
  } catch (error) {
    console.log(error);
  }
};

exports.getBooksCategoryId = async (req, res) => {
  const category = await Category.findById(req.params.id);

  const books = await Book.find({ category });

  if (!books)
    return res.status(400).json({ message: "category book not found" });
  res.json(books);
};

exports.createCategory = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let category = await new Category({
      name: req.body.name,
    }).save();

    if (!category)
      return res.status(500).json({ message: "category not created" });
    res.status(201).send(category);
  } catch (error) {
    console.log(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updateCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!updateCategory)
      return res.status(500).json({ message: "category not updated" });
    res.status(200).send(updateCategory);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCategory = (req, res) => {
  try {
    Category.findByIdAndRemove(req.params.id)
      .then((c) => {
        if (c) return res.status(200).json({ message: "category deleted" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
  } catch (error) {
    console.log(error);
  }
};
