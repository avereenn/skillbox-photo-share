import React from 'react';
import Article from './article.js';

export default function Feed({ posts, onImageClick }) {
  const articles = posts.map(post => {
    return (<li key={post.id} id={post.id} className="app__feed-item js-feed-item">
      <Article
        imgSrc={post.urls.thumb}
        imgDesc={post.description}
        authorName={post.user.name}
        authorLink={post.user.links.html}
        date={post.created_at}
        likesAmount={post.likes}
        onImgClick={onImageClick}
      />
    </li>);
  });

  return <ul className="app__feed">{articles}</ul>;
}
