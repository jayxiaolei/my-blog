import axios from './request'

export const getArticleList = () => axios.get('/api/blog/article/list')

export const getArticleDetail = (params) => axios.get(`/api/blog/article/detail?id=${params.id}`)