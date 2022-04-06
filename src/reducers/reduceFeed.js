export default function reduceFeed(state = { feed: [], modalVisible: false }, action) {
  let { feed, modalVisible } = state;
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
      
      return { feed, modalVisible };
      break;
      
    case `feed/toggleModalVisible`:
      modalVisible = !modalVisible;
      
      return { feed, modalVisible };
    default: return state;
  }
}