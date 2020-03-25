const BASE_URI = 'http://127.0.0.1:7001/default/'

const servicePath = {
  // 博客文章列表
  getArticleList: BASE_URI + 'getArticleList',
  // 最近更新列表 LIMIT 5
  getRecentArticleList: BASE_URI + 'getRecentArticleList',
  // 最多阅读列表 LIMIT 5
  getHotArticleList: BASE_URI + 'getHotArticleList',
  // 博客文章分类表
  getArticleListByTypeId: BASE_URI + 'getArticleListByTypeId/',
  // 博客详情页
  getArticleById: BASE_URI + 'getArticleById/',
  // 博客分类
  getTypeInfo: BASE_URI + 'getTypeInfo',
  // 点赞 By id
  addLike: BASE_URI + 'addArticleLikeById/',
}

export default servicePath