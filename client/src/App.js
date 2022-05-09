import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import "./App.css";
import "./SharedFiles/centerCSS.css";
import MovieForm from "../src/Components/MovieForm";
import FetchMovieList from "./Components/FetchMovieList";

function App() {
  const cout = (stringArgs) => {
    console.log(stringArgs);
  };
  const [movieList, setMovieList] = useState([]);
  const getMovie = useCallback(async () => {
    const data = await Axios.get("http://localhost:3001/api/get");
    setMovieList(data.data);
    // cout(data);
  }, []);

  const grabDatafrmForm = async (formDataInArray) => {
    const grabbedData = {
      ...formDataInArray,
    };
    const data = await Axios.post(
      "http://localhost:3001/api/insert",
      grabbedData
    );
    cout(data);
    cout(grabbedData);
    cout("Data Sent To Backend Successfully");
    getMovie();
    setMovieList([...movieList, grabbedData]);
  };

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div className="App">
      <div className="headingContainer center">
        <h1>CRUD Application</h1>
      </div>
      <div className="movieFromContainer">
        <MovieForm onDataArrive={grabDatafrmForm} />
      </div>
      <div id="movieListContainer">
        <FetchMovieList movieList={movieList} getMovie={()=>{getMovie()}}/>
      </div>
    </div>
  );
}

export default App;
