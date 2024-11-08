const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含a-zA-Z0-9的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 必填
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const userId = joi.number().required()
const articleTitle = joi.string().required()
const articleContent = joi.string().required()
const id = joi.number().required()
const commonStr = joi.string().pattern(/^[\S]{0,100}$/).required()
const parentId = joi.number()
const normalObject = joi.object().allow(null)

exports.reg_login_schema = {
    body: {
        username, password
    }
}

exports.delete_user = {
    body: {
        user_id: userId
    }
}

exports.write_article = {
    body: {
        article_title: articleTitle,
        article_content: articleContent
    }
}

exports.get_detail = {
    query: {
        id
    }
}

exports.delete_article = {
    body: {
        id
    }
}

exports.edit_article = {
    body: {
        id,
        article_title: articleTitle,
        article_content: articleContent
    }
}

exports.get_comments = {
    params: {
        article_id: id
    }
}

exports.write_comment = {
    body: {
        article_id: id,
        location: commonStr,
        name: commonStr,
        content: articleContent,
        parent_id: parentId,
        target_user: normalObject
    }
}

exports.praise_comment = {
    body: {
        id: id
    }
}
