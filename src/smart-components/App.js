import React from 'react';
import Feed from '../components/feed.js';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenModalImgClick = this.onOpenModalImgClick.bind(this);
  }

  onOpenModalImgClick(ev) {
    ev.target.style.transform = `scale(1.5)`;
  }

  render() {
    const { feed } = this.props;
    console.log(this.props);
    return (
      <div className="app__container">
        <Feed posts={feed} onImgClick={this.onOpenModalImgClick}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { feed: state };
}

App = connect(mapStateToProps)(App);

export default App;
