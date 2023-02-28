import axios from './request'

export const getArticleList = () => axios.get('/article/list')

export const getArticleDetail = (params) => axios.get(`/article/detail?id=${params.id}`)