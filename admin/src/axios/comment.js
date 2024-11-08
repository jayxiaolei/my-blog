import axios from './request'

export const getCommentsList = () => axios.get('/api/blog/article/comments')

export const deleteData = (params) => axios.post('/api/blog/article/comments/delete', params)

