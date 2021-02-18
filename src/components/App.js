import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./Homepage";
import MoviePickr from "./MoviePickr";
import FoodPickr from "./FoodPickr/FoodPickr";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Homepage} />
      <Route path="/moviepickr" component={MoviePickr} />
      <Route path="/foodpickr" component={FoodPickr} />
    </BrowserRouter>
  );
}

export default App;
