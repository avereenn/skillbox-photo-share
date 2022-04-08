import React from 'react';
import Feed from '../components/feed.js';
import { connect } from 'react-redux';
import { toggleLikeArticle } from '../store/actions/index.js';

function onToggleLikeArticleBtnClick(ev) {
  const articleId = ev.target.closest(`.js-feed-item`).id;
  toggleLikeArticle(articleId);
}

function App(props) {
  const { feed } = props;
  console.log(feed);
  return (
    <div className="app__container">
    <Feed
      articles={feed}
      onToggleLike={onToggleLikeArticleBtnClick}
    />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    feed: state.feed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    likeArticle: articleId => dispatch(likeArticle(articleId)),
  };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
