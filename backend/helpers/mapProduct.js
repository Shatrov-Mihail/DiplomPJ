module.exports = function (product) {
    return {
        id: product.id,
        title: product.title,
        imageUrl: product.image,
        additionalImages: product.additionalImages || [],
        content: product.content,
        category: product.category,
        price: product.price,
        publishedAt: product.createdAt,
    }
}