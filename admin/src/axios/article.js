import axios from './request'

export const writeArticle = (params) => axios.post('/article/write', params);

export const getArticleList = () => axios.get('/article/list')

export const getArticleDetail = (params) => axios.get(`/article/detail?id=${params.id}`)

export const deleteArticleByID = (params) => axios.post('/article/delete', params)

export const editArticleByID = (params) => axios.post('/article/edit', params)

