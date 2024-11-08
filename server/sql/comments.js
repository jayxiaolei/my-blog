const sqlObj = {
    getComments: 'SELECT * FROM ev_comments WHERE article_id = ? AND is_deleted = 0',
    getAllComments: 'SELECT * FROM ev_comments WHERE is_deleted = 0',
    writeComment: 'insert into ev_comments set ?',
    praiseComment: 'update ev_comments set praise_num = praise_num + 1 WHERE ?',
    deleteComment: 'DELETE FROM ev_comments WHERE id = ?',
}

module.exports = sqlObj