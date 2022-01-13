const { Book } = require("../models/book");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split("").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

exports.uploadOption = multer({ storage: storage });
exports.bookList = async (req, res) => {
  try {
    const bookList = await Book.find({}).populate("category");

    if (!bookList)
      return res.status(400).json({ message: "book list not found" });
    res.status(200).send(bookList);
  } catch (error) {
    console.log(error);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const getBookById = await Book.findById(req.params.id).populate("category");

    if (!getBookById)
      return res.status(400).json({ message: "book  not found" });
    res.status(200).send(getBookById);
  } catch (error) {
    console.log(error);
  }
};

exports.createBook = async (req, res) => {
  try {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    let book = await new Book({
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      image: `${basePath}${fileName}`,
    }).save();

    if (!book) return res.status(500).json({ message: "book not created" });
    res.status(201).send(book);
  } catch (error) {
    console.log(error);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(400).send("book not found");
    const file = req.file;
    let newImage;
    if (file) {
      const fileName = req.file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
      newImage = `${basePath}${fileName}`;
    } else {
      newImage = book.image;
    }
    const updateBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        image: newImage,
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

exports.deleteBook = (req, res) => {
  try {
    Book.findByIdAndRemove(req.params.id)
      .then((c) => {
        if (c) return res.status(200).json({ message: "book deleted" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
  } catch (error) {
    console.log(error);
  }
};
