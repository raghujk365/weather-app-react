import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function Error() {
  return (
    <div className="col-md-12 text-center mt-5">
      <div className="alert alert-danger" role="alert">
        Invalid city or an error occurred. Please try again.
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="col-md-12 text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function App() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getWeatherDetails = () => {
    if (isNaN(inputCity) && inputCity.trim() !== "" && show) {
      setLoading(true);
      setError(false);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((da) => {
          console.log(da);
          if (da.cod && da.cod !== 200) {
            setError(true);
            setData({});
          } else {
            setLoading(false)
            setError(false);
            setData(da);
          }
        })
        .catch((err) => {
          console.log("err", err);
          setError(true);
          setData({});
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    setShow(true);
    getWeatherDetails();
  };

  useEffect(() => {
    getWeatherDetails("delhi");
  }, []);

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResultBox">
            <img
              className="weatherIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
              alt="Weather Icon"
            />
            <h5 className="weatherCity">{data?.name}</h5>
            <h6 className="weatherTemp">{kelvinToCelsius(data?.main?.temp)}°C</h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
