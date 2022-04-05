export default function reduceFeed(state = [], action) {
  switch(action.type) {
    case `fedd/like`:
      return state.map(article => {
        if(article.id === action.payload) {
          if(article.liked_by_user) {
            article.liked_by_user = false;
            article.likes--;
          } else {
            article.liked_by_user = true;
            article.likes++;
          }
        }
      });
    default: return state;
  }
}