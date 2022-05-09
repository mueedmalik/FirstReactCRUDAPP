const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mySQL = require("mysql");

const cout = (stringArgs) => {
  console.log(stringArgs);
};

const myDB = mySQL.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "cruddb",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json()); //grab items from frontend in order to send it to DB

app.listen(3001, () => {
  cout("running on port 3001");
});

app.post("/api/insert", async (req, res) => {
  const movieNameSentToDB = req.body.movieNametobeSend;
  const movieReviewSentToDB = req.body.movieReviewtobeSend;
  const SQLInsertionQuery =
    "INSERT INTO cruddb.movie_reviews (movieName , movieReview) VALUES ( ? , ? ) ;";
  await myDB.query(
    SQLInsertionQuery,
    [movieNameSentToDB, movieReviewSentToDB],
    (err, result) => {
      if (err) cout(err);
      else {
        cout(result);
        res.send("Data Is Inserted In DB Successfully");
      }
    }
  );
});

app.get("/api/get", (req, res) => {
  const SQLSelectiontionQuery =
    "SELECT * FROM cruddb.movie_reviews ORDER BY movieID DESC;";
  myDB.query(SQLSelectiontionQuery, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete/:IDofMovie", async (req, res) => {
  const IDofMovie = req.params.IDofMovie;
  const SQLDelete = "DELETE FROM cruddb.movie_reviews WHERE movieID = ? ;";
  await myDB.query(SQLDelete, IDofMovie, (err, result) => {
    if (err) cout(err);
    else cout(result);
    res.send("Successfully Deleted");
    cout(IDofMovie);
  });
});

app.put("/api/update_movieName", async (req, res) => {
  const IDofMovie = req.body.IDofMovietobeUPD;
  const updatedName = req.body.newNametxtUP;
  cout("==============================");
  cout(IDofMovie);
  cout("-");
  cout(updatedName);
  const SQLUpdateName =
    "UPDATE cruddb.movie_reviews SET movieName = ? WHERE movieID = ? ;";
  await myDB.query(SQLUpdateName, [updatedName, IDofMovie], (err, result) => {
    if (err) cout(err);
    else {
      cout(result);
      res.send("Name is Successfully Updated");
    }
  });
});

app.put("/api/update_movieReview", async (req, res) => {
  const IDofMovie = req.body.IDofMovietobeUPD;
  const updatedReview = req.body.newReviewtxtUP;
  cout("==============================");
  cout(IDofMovie);
  cout("-");
  cout(updatedReview);
  const SQLUpdateReview =
    "UPDATE cruddb.movie_reviews SET movieReview = ? WHERE movieID = ? ;";
  await myDB.query(SQLUpdateReview, [updatedReview, IDofMovie], (err, result) => {
    if (err) cout(err);
    else {
      cout(result);
      res.send("Review is Successfully Updated");
    }
  });
});

app.get("/", (req, res) => {
  res.send("Database is running");
});
