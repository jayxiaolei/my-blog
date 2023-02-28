const db = require('../db/index')

const userSql = require('../sql/user')

exports.users = (req, res) => {
    db.query(userSql.getUserList, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        const userList = result

        res.send({
            status: 200,
            message: '获取成功',
            data: {
                users: userList
            }
        })
    })
}

exports.delUser = (req, res) => {
    db.query(userSql.deleteUser, req.body.user_id, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        if(result.affectedRows !== 1) {
            return res.cc('删除失败')
        }

        res.send({
            status: 200,
            message: '删除成功',
        })

    })
}