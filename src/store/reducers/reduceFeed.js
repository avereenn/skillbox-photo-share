export default function reduceFeed(state = { feed: [] }, action) {
  let { feed } = state;
  switch(action.type) {
    case `feed/toggleLike`:
      feed = feed.map(article => {
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
      
      return { feed };
      break;
    
    default: return state;
  }
}