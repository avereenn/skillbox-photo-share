import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { incPagesNumber } from '../store/actions/feed.js';
import { Preloader, Error } from './statusComponents.js';
import Article from './Article.js';

export default function Feed({ articles, status, error }) {
  const feedRef = useRef(null);
  const lastArticleRef = useRef(null);
  const observerLoader = useRef(null);
  const dispatch = useDispatch();
  const articleItems = articles.map((article, index, arr) => {

    if(index + 1 === arr.length) {
      return (<li key={article.id} id={article.id} className="feed__item"  ref={lastArticleRef}>
      <Article articleInfo={article} />
    </li>);
    }

    return (<li key={article.id} id={article.id} className="feed__item">
      <Article articleInfo={article} />
    </li>);
  });

  function actionInSight(entries) {
    if(entries[0].isIntersecting) dispatch(incPagesNumber());
  }

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }

    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastArticleRef.current) {
      observerLoader.current.observe(lastArticleRef.current);
    }
  }, [articles.length]);

  return (
    <>
      <ul className="feed" ref={feedRef}>{articleItems}</ul>
      {status === `loading` && <Preloader />}
      {error && <Error error={error} />}
    </>
  );
}
