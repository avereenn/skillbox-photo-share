import React from 'react';
import ImageItem from './imageItem.js';

export default function ImageList( { posts, onImageClick }) {
  const imageItems = posts.map(post => {
    return (<li id={post.id} className="app__image-item">
            <ImageItem
              imgSrc={post.urls.thumb}
              authorName={post.user.name}
              authorLink={post.user.link}
              date={post.date}
              likesAmount={post.likes}
              onImgClick={onImageClick}
           />
           </li>);
  });
  
  return <ul className="app__images-list">{imageItems}</ul>;
}