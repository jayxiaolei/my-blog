import axios from './request';

export const getArticleList = () => axios.get('/api/blog/article/list');

export const getArticleDetail = (params) => axios.get(`/api/blog/article/detail?id=${params.id}`);

export const writeComment = (params) => axios.post('/api/blog/article/comments/write', params);

export const getComments = (params) => axios.get(`/api/blog/article/comments`, { params: params });

export const praiseComment = (params) => axios.post('/api/blog/article/comments/praise', params);
