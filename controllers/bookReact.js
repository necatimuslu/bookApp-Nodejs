const { Book } = require("../models/book");

exports.createReactBook = async (req, res) => {
  try {
    let book = await new Book({
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      image: req.body.image,
    }).save();

    if (!book) return res.status(500).json({ message: "book not created" });
    res.status(201).send(book);
  } catch (error) {
    console.log(error);
  }
};

exports.updateReactBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(400).send("book not found");

    const updateBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        image: req.body.image,
      },
      { new: true }
    );

    if (!updateBook)
      return res.status(500).json({ message: "book not updated" });
    res.status(201).send(updateBook);
  } catch (error) {
    console.log(error);
  }
};
