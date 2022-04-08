export function toggleLikeArticle(articleId) {
  return {
    type: `feed/toggleLike`,
    payload: articleId,
  };
}