const db = require('../db/index')

const userSql = require('../sql/user')

exports.writeArticle = (req, res) => {
    const { article_title, article_content } = req.body
    const publish_date = new Date()
    db.query(userSql.writeArticle, { article_title, article_content, publish_date }, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        if (result.affectedRows !== 1) {
            return res.cc('添加失败')
        }

        res.cc('添加成功', 200)
        
    })
}

exports.getArticleList = (req, res) => {
    db.query(userSql.selectArticleList, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        res.send({
            status: 200,
            message: '获取成功',
            data: result
        })
    })
}

exports.getDetail = (req, res) => {
    db.query(userSql.selectDetail, req.query.id, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        res.send({
            status: 200,
            message: '获取成功',
            data: result[0]
        })
    })
}

exports.deleteArticle = (req, res) => {
    db.query(userSql.deleteArticle, req.body.id, (err, result) => {
        if (err) {
            res.cc(err)
        }

        if(result.affectedRows !== 1) {
            return res.cc('删除失败')
        }

        res.cc('删除成功', 200)
    })
}

exports.editArticle = (req, res) => {
    const { article_title, article_content, id } = req.body
    const publish_date = new Date()
    console.log(publish_date)
    db.query(userSql.editArticle, [{ article_title, article_content, publish_date }, id], (err, result) => {
        if (err) {
            return res.cc(err)
        }

        if(result.affectedRows !== 1) {
            return res.cc('更新失败')
        }

        res.cc('更新成功', 200)
    })
}
