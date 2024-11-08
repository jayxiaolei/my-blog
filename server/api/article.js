const express = require('express');

const router = express.Router();

const articleHandle = require('../api_handler/article')
const commentsHandle = require('../api_handler/comments')

// 验证规则中间件
const expressJoi = require('@escook/express-joi')
//导入需要验证的对象
const { write_article, get_detail, delete_article, edit_article, write_comment, praise_comment }  = require('../schema/user.js')

router.post('/article/write', expressJoi(write_article), articleHandle.writeArticle)

router.get('/blog/article/list', articleHandle.getArticleList)

router.get('/blog/article/detail', expressJoi(get_detail), articleHandle.getDetail)

router.post('/article/delete', expressJoi(delete_article), articleHandle.deleteArticle)

router.post('/article/edit', expressJoi(edit_article), articleHandle.editArticle)

router.get('/blog/article/comments', commentsHandle.getComments)

router.post('/blog/article/comments/write', expressJoi(write_comment), commentsHandle.writeComment)

router.post('/blog/article/comments/praise', expressJoi(praise_comment), commentsHandle.praiseComment)

router.post('/blog/article/comments/delete', expressJoi(praise_comment), commentsHandle.deleteComment)


module.exports = router