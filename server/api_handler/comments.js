const db = require('../db/index')
const dayJS = require('dayjs');

const commentsSql = require('../sql/comments')

const date = dayJS();

exports.writeComment = (req, res) => {
    const { article_id, location, name, content, parent_id, target_user } = req.body
    const time = date.format('YYYY-MM-DD HH:mm:ss');
    db.query(commentsSql.writeComment, { article_id, location, time, name, content, parent_id, target_user: JSON.stringify(target_user) }, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        if (result.affectedRows !== 1) {
            return res.cc('添加失败')
        }

        res.cc('添加成功', 200)

    })
}

exports.praiseComment = (req, res) => {
    const { id } = req.body
    console.log('prase', 111)
    db.query(commentsSql.praiseComment, { id }, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        if (result.affectedRows !== 1) {
            return res.cc('点赞失败')
        }

        res.cc('点赞成功', 200)

    })
}

exports.getComments = (req, res) => {
    const articleId = req.query.article_id; // 获取 article_id
    const sql = articleId ? commentsSql.getComments : commentsSql.getAllComments;
    db.query(sql, articleId || null, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        rootComments = result;
        if (articleId) {
            const commentsMap = {};
            result.forEach(comment => {
                comment.children = []; // 初始化 children 字段
                if (comment.target_user) {
                    comment.target_user = JSON.parse(comment.target_user); // 将 target_user 字段解析为对象
                }
                commentsMap[comment.id] = comment; // 将评论存入映射
            });

            result.forEach(comment => {
                if (comment.parent_id && commentsMap[comment.parent_id]) {
                    commentsMap[comment.parent_id].children.push(comment); // 将子评论添加到父评论的 children 字段
                }
            });

            rootComments = result.filter(comment => !comment.parent_id);
        }
        res.send({
            status: 200,
            message: '获取成功',
            data: rootComments
        })
    })
}

exports.deleteComment = (req, res) => {
    const { id } = req.body
    db.query(commentsSql.deleteComment, id, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        if (result.affectedRows !== 1) {
            return res.cc('删除失败')
        }

        res.cc('删除成功', 200)

    })
}
