import React from 'react';
import Feed from '../components/feed.js';
import { connect } from 'react-redux';
import { likeArticle } from '../actions/index.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenModalImgClick = this.onOpenModalImgClick.bind(this);
  }

  onOpenModalImgClick(ev) {
    ev.target.style.transform = `scale(1.5)`;
  }

  onLikeArticleBtnClick(ev) {
    const articleId = ev.target.closest(`js-feed-item`).id;

    likeArticle(articleId);
  }

  render() {
    const { feed } = this.props;

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

function mapDispatchToProps(dispatch) {
  return {
    likeArticle: articleId => dispatch(likeArticle(articleId)),
  };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
