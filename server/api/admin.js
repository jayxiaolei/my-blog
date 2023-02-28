const express = require('express');

const router = express.Router();

const adminHandle = require('../api_handler/admin')

// 验证规则中间件
const expressJoi = require('@escook/express-joi')
//导入需要验证的对象
const { delete_user }  = require('../schema/user')


router.get('/users', adminHandle.users)
router.post('/deluser', expressJoi(delete_user), adminHandle.delUser)


module.exports = router