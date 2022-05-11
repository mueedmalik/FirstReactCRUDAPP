import React, { useState } from "react";
import "./FetchMovieList.css";
import "../SharedFiles/centerCSS.css";
import Card from "../SharedFiles/Card";
import Block from "../SharedFiles/Block";
import Axios from "axios";

function FetchMovieList(props) {
  const chooseName = "name";
  const chooseReview = "review";
  const [toggleBtnTxt, setToggleBtnTxt] = useState("Expand List"); // to change the text of expand/collapse button
  const [delShowState, setDelShowState] = useState(false); ////////// to show options of deletion
  const [showState, setShowState] = useState(false); //////////////// to show options of updation
  const [choiceShowState, setChoiceShowState] = useState(false); //// to show name or review
  const [crrBlock, setCrrBlock] = useState(-1); ///////////////////// to expand only that card with current index of map
  const [updateChoice, setUpdateChoice] = useState(""); ///////////// name or review
  const [updateName, setUpdateName] = useState(""); ///////////////// new name
  const [updateReview, setUpdateReview] = useState(""); ///////////// new review

  const cout = (stringArgs) => {
    console.log(stringArgs);
  };
  const alertFunction = (stringArgs) => {
    alert(stringArgs);
  };
  const showBtnClicked = () => {
    const movieListDisplayContainer = document.getElementById(
      "movieListDisplayContainer"
    );
    if (
      movieListDisplayContainer.style.display === "" ||
      movieListDisplayContainer.style.display === "none"
    ) {
      movieListDisplayContainer.style.display = "flex";
      setToggleBtnTxt("Collapse List");
    } else if (movieListDisplayContainer.style.display === "flex") {
      movieListDisplayContainer.style.display = "none";
      setToggleBtnTxt("Expand List");
    }
    setShowState(false);
    setDelShowState(false);
    setChoiceShowState(false);
  };

  const movieDelChoice = (IDofMovietobeDEL, mapIndex) => {
    setDelShowState(!delShowState);
    setShowState(false);
    setChoiceShowState(false);
    setCrrBlock(mapIndex);
    cout("ID of Movie to be Delete: " + IDofMovietobeDEL);
  };

  const closeDelBtnChoice = () => {
    setDelShowState(false);
  };

  const deleteMovie = async (IDofMovietobeDEL) => {
    setDelShowState(false);
    setShowState(false);
    const response = await Axios.delete(
      `http://localhost:3001/api/delete/${IDofMovietobeDEL}`
    );
    if (response?.status) {
      props.getMovie();
      setTimeout(() => {alertFunction("Movie is deleted")}, 18);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const updateBtnClicked = (IDofMovietobeUPD, mapIndex) => {
    setCrrBlock(mapIndex);
    setShowState(!showState);
    setChoiceShowState(false);
    setDelShowState(false);
    cout("Index: " + mapIndex + " ID: " + IDofMovietobeUPD);
  };

  const nameBtnClicked = () => {
    setUpdateChoice(chooseName);
    setChoiceShowState(true);
    setShowState(false);
  };

  const reviewBtnClicked = () => {
    setUpdateChoice(chooseReview);
    setChoiceShowState(true);
    setShowState(false);
  };

  const newNameEntered = (event) => {
    setUpdateName(event.target.value);
  };

  const movieNameUpdatedBtn = async (IDofMovietobeUPD, newNametxtUP) => {
    if (updateName.length > 0) {
      cout(updateName);
      setUpdateName("");
      setChoiceShowState(false);
      setShowState(false);
      cout(
        "when movie name btn pressed " +
          IDofMovietobeUPD +
          " - New Name: " +
          newNametxtUP
      );
      const response = await Axios.put(
        "http://localhost:3001/api/update_movieName",
        {
          IDofMovietobeUPD: IDofMovietobeUPD,
          newNametxtUP: newNametxtUP,
        }
      );
      if (response?.status) {
        props.getMovie();
      }
    } else {
      alertFunction("Error: Enter New Movie Name.");
    }
  };
  const newReviewEntered = (event) => {
    setUpdateReview(event.target.value);
  };

  const movieReviewUpdatedBtn = async (IDofMovietobeUPD, newReviewtxtUP) => {
    if (newReviewtxtUP.length > 0) {
      cout(updateReview);
      setUpdateReview("");
      setChoiceShowState(false);
      setShowState(false);
      cout(
        "when movie REVIEW btn pressed " +
          IDofMovietobeUPD +
          " - " +
          newReviewtxtUP
      );
      const response = await Axios.put(
        "http://localhost:3001/api/update_movieReview",
        {
          IDofMovietobeUPD: IDofMovietobeUPD,
          newReviewtxtUP: newReviewtxtUP,
        }
      );
      if (response?.status) {
        props.getMovie();
      }
    } else {
      alertFunction("Error: Enter New Movie Review.");
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="FetchMovieList">
      <Card>
        <div className="showBtnContainer center">
          <button id="showBtn" className="center" onClick={showBtnClicked}>
            {toggleBtnTxt}
          </button>
        </div>
        <div id="movieListDisplayContainer" className="center">
          <p id="movieListLength">
            Total Items In Movie List: {props.movieList.length}
          </p>
          {props.movieList.map((val, index) => {
            return (
              <div id="movieList" className="center" key={index + 1}>
                <Block className=" setSameWidth">
                  <div id="listItem" className="center">
                    <h3>{val.movieName}</h3>
                    <p>
                      Sr#: {index + 1} - - | - - Movie ID: {val.movieID}
                    </p>
                    <p>
                      <u>Movie Review</u>: {val.movieReview}
                    </p>
                    <div id="deleteBtnContainer" className="center">
                      <button
                        id="deleteBtn"
                        onClick={() => {
                          movieDelChoice(val.movieID, index);
                        }}
                      >
                        Delete
                      </button>
                      {crrBlock === index && delShowState ? (
                        <div>
                          <button id="closeDelBtn" onClick={closeDelBtnChoice}>
                            ✖
                          </button>
                          <button
                            id="doneDelBtn"
                            onClick={() => {
                              deleteMovie(val.movieID);
                            }}
                          >
                            ✓
                          </button>
                        </div>
                      ) : null}
                    </div>

                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                    <div className="updateBtnContainer center">
                      <button
                        value="mainUpdateBtn"
                        onClick={() => {
                          updateBtnClicked(val.movieID, index);
                        }}
                      >
                        Update Movie
                      </button>
                    </div>
                    {crrBlock === index && showState ? (
                      <div id="choiceBtnContainer" className="center">
                        <button onClick={nameBtnClicked}>Update Name</button>
                        <button onClick={reviewBtnClicked}>
                          Update Review
                        </button>
                      </div>
                    ) : null}
                    {crrBlock === index &&
                    updateChoice === "name" &&
                    choiceShowState ? (
                      <div className="updateNameContainer">
                        <input
                          type="text"
                          placeholder="Enter movie name..."
                          value={updateName}
                          onChange={newNameEntered}
                        />
                        <button
                          onClick={() => {
                            movieNameUpdatedBtn(val.movieID, updateName);
                          }}
                        >
                          Update Name
                        </button>
                      </div>
                    ) : null}
                    {crrBlock === index &&
                    updateChoice === "review" &&
                    choiceShowState ? (
                      <div className="updateReviewContainer">
                        <input
                          type="text"
                          placeholder="Enter movie review..."
                          value={updateReview}
                          onChange={newReviewEntered}
                        />
                        <button
                          onClick={() => {
                            movieReviewUpdatedBtn(val.movieID, updateReview);
                          }}
                        >
                          Update Review
                        </button>
                      </div>
                    ) : null}
                  </div>
                </Block>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default FetchMovieList;
