const db = require('../db/index')

// 加密
const bcrypt = require('bcryptjs')

const userSql = require('../sql/user')

const config = require('../config')

// 生成token
const jwt = require('jsonwebtoken')

exports.reguser = (req, res) => {
    const userInfo = req.body
    // 对表单进行判断
    if (!userInfo.username || !userInfo.password) {
        res.send({
            status: 1,
            message: '用户名或者密码不合理'
        })
    }

    db.query(userSql.selectUserName, userInfo.username, (err, result) => {
        if (err) {
            return res.cc(err.message)
        }

        if (result.length > 0) {
            return res.cc('用户名已经存在')
        }

        userInfo.password = bcrypt.hashSync(userInfo.password, 10);

        // 插入新用户
        db.query(userSql.insertUsers, { username: userInfo.username, password: userInfo.password }, (err, result) => {
            if (err) {
                res.cc(err.message)
            }

            if (result.affectedRows !== 1) {
                return res.cc('注册失败')
            }

            res.cc('注册成功', 200)
        })
    })
}

exports.login = (req, res) => {
    const userInfo = req.body

    db.query(userSql.selectUserName, userInfo.username, (err, result) => {
        if (err) {
            return res.cc(err)
        }

        if (result.length !== 1) {
            return res.cc('当前用户不存在')
        }

        const compareResult = bcrypt.compareSync(userInfo.password, result[0].password)

        if (!compareResult) {
            return res.cc('密码错误！')
        }

        const user = { ...result[0], password: '', user_pic: '' }
        res.send({
            status: 200,
            message: '登陆成功',
            data: {
                token: jwt.sign(user, config.secretKey, { expiresIn: '24H' })
            }
        })
    })
}
