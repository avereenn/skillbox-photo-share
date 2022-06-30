import React, { forwardRef } from 'react';

const LikeButton = forwardRef(({ isLiked = false, onBtnClick }, ref) => {
  return (
    <button
      className={`article__like-btn ${isLiked ? `article__like-btn_like` : ``}`}
      type="button"
      onClick={onBtnClick}
      ref={ref}
    >
      <svg className="article__svg-heart" xmlns="http://www.w3.org/2000/svg" width="175" height="175" viewBox="0 0 175 175">
        <path d="M 100 170 L 50 130 A 30 30 0 0 1 100 80 A 20 20 0 0 1 150 130 Z" stroke="#000" strokeWidth="2" fill="none" />
      </svg>
    </button>
  );
});

export default LikeButton;
