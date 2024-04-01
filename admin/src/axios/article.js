import axios from './request'

export const writeArticle = (params) => axios.post('/api/article/write', params)

export const getArticleList = () => axios.get('/api/blog/article/list')

export const getArticleDetail = (params) => axios.get(`/api/blog/article/detail?id=${params.id}`)

export const deleteArticleByID = (params) => axios.post('/api/article/delete', params)

export const editArticleByID = (params) => axios.post('/api/article/edit', params)
