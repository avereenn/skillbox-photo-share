import React from 'react';
import ImageList from '../components/imageList.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app__container">
        <ImageList />
      </div>
    )
  }
}