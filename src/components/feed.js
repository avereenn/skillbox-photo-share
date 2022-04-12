import React from 'react';
import { useSelector } from 'react-redux';
import Article from './article.js';

export default function Feed(props) {
  const articles = useSelector(state => state.feed);
  const articleItems = articles.map(article => {
    return (<li key={article.id} id={article.id} className="app__feed-item js-feed-item">
      <Article articleInfo={article} />
    </li>);
  });

  return <ul className="app__feed">{articleItems}</ul>;
}
