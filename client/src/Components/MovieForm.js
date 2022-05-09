import { useState } from "react";
import "./MovieForm.css";
import "../SharedFiles/centerCSS.css";
import Axios from "axios";

function MovieForm(props) {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");

  const movieNameChanged = (event) => {
    setMovieName(event.target.value);
  };

  const movieReviewChanged = (event) => {
    setMovieReview(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (movieName === "" || movieReview === "") {
      alert("Enter Data in Both Input Fields");
    } else {
      const enteredData = {
        movieNametobeSend: movieName,
        movieReviewtobeSend: movieReview,
      };
      setMovieName("");
      setMovieReview("");
      props.onDataArrive(enteredData);
      // props.onBtnClicked();
      // getMovie();
      // props.reloadPage();
    }
  };

  return (
    <div className="MovieForm">
      <form onSubmit={formSubmissionHandler}>
        <div className="inputContainer center">
          <label>Movie Name:</label>
          <input
            type="text"
            placeholder="Enter movie name..."
            value={movieName}
            onChange={movieNameChanged}
          />
          <div className="movieReviewContainer center">
            <label>Movie Review:</label>
            <input
              type="text"
              placeholder="Enter movie review..."
              value={movieReview}
              onChange={movieReviewChanged}
            />
          </div>
          <button id="formSubmitBtn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
