export function likeArticle(articleId) {
  return {
    type: `feed/like`,
    payload: articleId,
  };
}