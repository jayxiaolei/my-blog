const express = require('express');
const cors = require('cors');
const app = express();
const joi = require('joi');
const expressJwt = require('express-jwt');
const config = require('./config');

app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
// 配置登录的token
app.use(expressJwt({secret: config.secretKey}).unless({path: [/^\/api\/blog/]}))

app.use(express.json())
// 配置解析表单数据格式
app.use(express.urlencoded({extended: false}))

// 配置跨域
app.use(cors())

const apiUser = require('./api/user')
const apiAdmin = require('./api/admin')
const apiArticle = require('./api/article')

app.use('/api/blog', apiUser)
app.use('/api', apiAdmin)
app.use('/api', apiArticle)

app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc(err)
    }

    if (err.name === 'UnauthorizedError') {
        return res.cc('身份认证失败！', 403)
    }
    res.cc(err)
})

app.listen('1231', () => {
    console.log('http://127.0.0.1:1231')
})



