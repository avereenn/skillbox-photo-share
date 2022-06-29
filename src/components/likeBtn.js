import React from 'react';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

function TooltipLikeBtn() {
  return (
    <div className="article__like-tooltip">
      Чтобы оценивать фотографии <Link to="/">авторизуйтесь</Link>
    </div>
  );
}

export default function LikeButton({ isAuth = false, isLiked = false, onBtnClick }) {
  const className = `article__like-btn ${isLiked ? `article__like-btn_like` : ``}`;
  const btnJsx = (<button className={className} type="button" onClick={onBtnClick}>
    <svg className="article__svg-heart" xmlns="http://www.w3.org/2000/svg" width="175" height="175" viewBox="0 0 175 175">
      <path d="M 100 170 L 50 130 A 30 30 0 0 1 100 80 A 20 20 0 0 1 150 130 Z" stroke="#000" strokeWidth="2" fill="none" />
    </svg>
  </button>);

  return isAuth ? btnJsx : <Tippy content={<TooltipLikeBtn />} hideOnClick={true}>{btnJsx}</Tippy>;
}
