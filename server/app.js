var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const fs = require("fs");
const zlib = require("zlib");

var cors = require("cors");
var fileUpload = require("express-fileupload");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post("/upload/react", (req, res, next) => {
  console.log(req);
  let componentFile = req.files.file;

  componentFile.mv(
    `${__dirname}/public/react_components/${req.body.filename}.js`,
    function(err) {
      if (err) {
        return res.status(500).send(err);
      }

      // const fileContents = fs.createReadStream(
      //   `${__dirname}/public/react_components/${req.body.filename}.js`
      // );
      // const writeStream = fs.createWriteStream("./data/file1.txt");
      // const unzip = zlib.createGunzip();

      // fileContents.pipe(unzip).pipe(writeStream);

      res.json({
        file: `react_component/${req.body.filename}.js`
      });
    }
  );
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
