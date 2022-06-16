// функция для получения callback url в зависимости от местоположения сервера
export function getCallbackUrl() {
  switch(window.location.origin) {
    case `http://127.0.0.1:5500`:
      return `http://127.0.0.1:5500`;
    case `https://neenjah.github.io`:
      return `https://neenjah.github.io/skillbox-photo-share`;
    default: return window.location.origin;
  };
}

// функция установки ошибки в состояние
export function setError(state, { payload }) {
  state.status = `rejected`;
  state.error = payload;
}
