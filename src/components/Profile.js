import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeAccessToken } from '../store/actions/auth.js';

export default function Profile() {
  const { isAuth } = useSelector(state => state.auth);
  const { userInfo } = useSelector(state => state.user);
  const username = userInfo?.username;
  const userImgSrc = userInfo?.profile_image?.small;
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const [isDropvisible, setDropVisible] = useState(false);


  function onHideDropdownWindowClick(ev) {
    if(!dropdownRef.current || !dropdownRef.current.contains(ev.target)) return;

    setDropVisible(false);
  }

  function onToggleDropVisibleBtnClick() {
    setDropVisible(!isDropvisible);
  }

  function onSignOutBtnClick() {
    dispatch(removeAccessToken());
  }

  useEffect(() => {
    window.addEventListener(`click`, onHideDropdownWindowClick);
    return () => window.removeEventListener(`click`, onHideDropdownWindowClick);
  });

  return isAuth ? (
    <div className="header__profile profile">
      <button className="profile__button" type="button" onClick={onToggleDropVisibleBtnClick}>
        <img className="profile__avatar-img" src={userImgSrc} alt="аватар пользователя" />
      </button>
      {username}
      <div className={`profile__dropdown ${isDropvisible ? `profile__dropdown_visible` : ``}`} ref={dropdownRef}>
        <button className="profile__sign-out-btn" type="button" onClick={onSignOutBtnClick}>Выйти</button>
      </div>
    </div>
  ) : (
    <div className="header__profile profile">
      <Link to="/">Войти</Link>
    </div>
  );
}
