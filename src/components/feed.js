import React from 'react';
import Article from './article.js';

export default function Feed({ articles }) {
  const articleItems = articles.map(article => {
    return (<li key={article.id} id={article.id} className="app__feed-item js-feed-item">
      <Article articleInfo={article} />
    </li>);
  });

  return <ul className="app__feed">{articleItems}</ul>;
}
