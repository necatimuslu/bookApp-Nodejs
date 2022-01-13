const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv = require("dotenv/config");

const app = express();

const categoryRoutes = require("./routes/category");
const bookRoutes = require("./routes/book");
const bookReactRoutes = require("./routes/bookReact");
app.use(cors());
app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

app.use("/category", categoryRoutes);
app.use("/book", bookRoutes);
app.use("/react", bookReactRoutes);

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(process.env.DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mondoDB ye başarılı şekilde bağlanıldı"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`nodejs server ${process.env.PORT} portundan ayaklandı`)
);
