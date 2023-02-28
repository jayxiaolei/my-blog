const express = require('express');

const router = express.Router();

const userHandle = require('../api_handler/user')

// 验证规则中间件
const expressJoi = require('@escook/express-joi')
//导入需要验证的对象
const { reg_login_schema }  = require('../schema/user')

router.post('/reguser', expressJoi(reg_login_schema), userHandle.reguser)

router.post('/login', expressJoi(reg_login_schema), userHandle.login)



module.exports = router