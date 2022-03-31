import { createStore } from "redux";
import unsplashApi from "./unsplash";

let initialState = [];

unsplashApi.photos.list()
  .then(result => {
    initialState = result.response.results;
  })
  .catch(err => console.log(err));

const photoStore = createStore(reducePhotos, initialState);
