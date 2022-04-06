import React from 'react';
import Feed from '../components/feed.js';
import Modal from '../components/modal.js';
import { connect } from 'react-redux';
import { toggleLikeArticle, toggleModalVisible } from '../actions/index.js';
/*
class App extends React.Component {
  constructor(props) {
    super(props);

    this.onOpenModalImgClick = this.onOpenModalImgClick.bind(this);
  }

  onOpenModalImgClick(ev) {
    ev.target.style.transform = `scale(1.5)`;
  }

  onLikeArticleBtnClick(ev) {
    const articleId = ev.target.closest(`.js-feed-item`).id;

    toggleLikeArticle(articleId);
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
*/
function onOpenModalImgClick() {
  toggleModalVisible();
}

function onToggleLikeArticleBtnClick(ev) {
  const articleId = ev.target.closest(`.js-feed-item`).id;
  toggleLikeArticle(articleId);
}

function App(props) {
  const { feed, modalVisible } = props;
  return (
    <div className="app__container">
    <Feed
      posts={feed}
      onImgClick={onOpenModalImgClick}
    />
    <Modal visible={modalVisible} onToggleLike={onToggleLikeArticleBtnClick} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    feed: state.feed,
    modalVisible: state.modalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModalVisible: () => dispatch(toggleModalVisible()),
    likeArticle: articleId => dispatch(likeArticle(articleId)),
  };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;