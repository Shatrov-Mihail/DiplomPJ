const mongoose = require("mongoose")
const mapComment = require("./mapComment")

module.exports = function (post) {
    return {
        id: post.id,
        title: post.title,
        imageUrl: post.image,
        additionalImages: post.additionalImages || [],
        content: post.content,
        category: post.category,
        price: post.price,
        comments: post.comments.map(comment => mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)),
        publishedAt: post.createdAt,
    }
}