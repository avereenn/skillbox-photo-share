import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAccessToken, fetchAccessToken } from '../store/actions/auth.js';
import { Preloader } from './statusComponents.js';
import unsplashApi from '../unsplash.js';
import { LOCAL_STORAGE_KEY } from '../constants.js';

export default function LoginPage() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const localToken = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!/null|undefined|^\s*$/.test(localToken)) {
    dispatch(setAccessToken(localToken));
  }

  useEffect(() => {
    const authCode = window.location.search.split(`code=`)[1];

    if (authCode) {
      dispatch(fetchAccessToken(authCode));
    }
  }, []);

  function onAuthBtnClick() {
    const authenticationUrl = unsplashApi.auth.getAuthenticationUrl([
      `public`,
      `write_likes`,
    ]);

    window.location = authenticationUrl;
  }

  return isAuth ? (
    <>
      <Preloader />
      <Navigate to="/feed" />
    </>
  ) : (
    <div className="login-page">
      <button type="button" className="login-page__button" onClick={onAuthBtnClick}>
        <svg width="26" height="26" viewBox="0 0 32 32" version="1.1">
          <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" />
        </svg>
        Войти через unsplash
      </button>
      <Link to="/feed" className="login-page__skip-link">Продолжить без авторизации</Link>
    </div>
  );
}
