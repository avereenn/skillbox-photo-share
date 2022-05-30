import React from 'react';
import { Preloader, Error } from './statusComponents.js';
import Article from './article.js';

export default function Feed({ articles, status, error }) {
  const articleItems = articles.map(article => {
    return (<li key={article.id} id={article.id} className="app__feed-item js-feed-item">
      <Article articleInfo={article} />
    </li>);
  });

  return (
    <React.Fragment>
      {status === `loading` && <Preloader />}
      {error && <Error error={error} />}
      <ul className="app__feed">{articleItems}</ul>
    </React.Fragment>
  );
}
