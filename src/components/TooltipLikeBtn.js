import React, { useState } from 'react';
import LikeButton from './LikeBtn.js';
import Tippy from '@tippyjs/react';

function Tooltip() {
  return (
    <div className="article__like-tooltip">
      Чтобы оценивать фотографии авторизуйтесь
    </div>
  );
}

export default function TooltipLikeButton({ isAuth = false, isLiked = false, onBtnClick }) {
  const [tippyVisible, setTippyVisible] = useState(false);
  const showTippy = () => setTippyVisible(true);
  const hideTippy = () => setTippyVisible(false);

  return isAuth ? <LikeButton isLiked={isLiked} onBtnClick={onBtnClick} /> :
    <Tippy onClickOutside={hideTippy} visible={tippyVisible} content={<Tooltip />}>
      {<LikeButton isLiked={isLiked} onBtnClick={showTippy} />}
    </Tippy>;
}
