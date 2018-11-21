const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const app = express();
const JSZip = require("jszip");

const editJSON = (newJsonComponent, cb) => {
  const fileName = `${__dirname}/public/externalComponents.json`;
  let contents = fs.readFileSync(fileName);
  const jsonContent = JSON.parse(contents);
  jsonContent.push(newJsonComponent);
  contents = JSON.stringify(jsonContent);
  // This will work for data big as 100 MB max effectively. Over this limit, we should use a database engine.
  fs.writeFile(fileName, contents, "utf8", cb);
};

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
  let componentFile = req.files.file;
  console.log(componentFile);
  componentFile.mv(
    `${__dirname}/public/react_components/${componentFile.name}`,
    function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({
        file: `react_component/${componentFile.name}`
      });
    }
  );
});

app.post("/upload/metadata", (req, res, next) => {
  let componentFile = req.files.file;

  editJSON(JSON.parse(componentFile.data), () => {
    console.log("DONE.");
    res.end();
  });
});

app.post("/upload/zip", (req, res, next) => {
  let componentFile = req.files.file;
  let zipProcess = 2; //when this is equal to 0 all promises are done.

  const endRequest = () => {
    zipProcess--;
    if (zipProcess === 0) {
      console.log("ENDREQUEST.");
      res.end();
    }
  };

  JSZip.loadAsync(componentFile.data).then(function(zip) {
    const files = Object.keys(zip.files);
    console.log(files);
    files.forEach(file => {
      if (file.endsWith("js")) {
        console.log("file JS process...");
        zip
          .file(file)
          .async("string")
          .then(function(data) {
            fs.writeFile(
              `${__dirname}/public/react_components/${file}`,
              data,
              function(err) {
                if (err) {
                  return console.log(err);
                }
                console.log("The JS file was saved!");
                endRequest();
              }
            );
          });
      } else if (file.endsWith("json")) {
        console.log("file JSON process...");
        zip
          .file(file)
          .async("string")
          .then(function(data) {
            editJSON(JSON.parse(data), () => {
              endRequest();
            });
          });
      }
    });
    console.log("ZIP DONE.");
  });
  console.log("ZIP FUNC");
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
