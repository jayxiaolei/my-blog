const sqlObj = {
    selectUserName: 'select * from ev_users where username = ?',
    insertUsers: 'insert into ev_users set ?',
    getUserList: 'select * from ev_users',
    selectUserInfo: 'select id, username, nickname, email, user_pic from ev_users where id=?',
    updateUserINfo: 'update ev_users set ? where id=?',
    updatePassword: 'update ev_users set password=? where id=?',
    selectByUserId: 'select * from ev_users where id=?',
    updateAvatar: 'update ev_users set avatar=? where id=?',
    selectArticleByID: 'select * from ev_article_cate where is_delete=0 order by id asc',
    deleteUser: 'delete from ev_users where id=?',
    writeArticle: 'insert into ev_article set ?',
    selectArticleList: 'select * from ev_article where is_delete=0 order by id asc',
    selectDetail: 'select * from ev_article where id=?',
    deleteArticle: 'update ev_article set is_delete=1 where id=?',
    editArticle: 'update ev_article set ? where id=?'
}

module.exports = sqlObj