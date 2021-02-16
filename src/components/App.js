import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import MoviePickr from "./MoviePickr";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Homepage} />
      <Route path="/moviepickr" component={MoviePickr} />
    </BrowserRouter>
  );
}

export default App;
