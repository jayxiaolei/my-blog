const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Ajay971231',
    database: 'blog'
})

// 添加错误处理
db.getConnection((err, connection) => {
    if (err) {
        console.error('数据库连接失败:', err)
        return
    }
    console.log('成功连接到数据库')
    connection.release() // 释放连接
})

module.exports = db