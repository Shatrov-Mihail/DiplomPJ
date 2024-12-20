const Post = require('../models/Post')

// add
async function addPost(postData) {
    try {
        // Проверяем наличие изображений
        if (!postData.imageUrl && (!postData.additionalImages || !postData.additionalImages.length)) {
            throw new Error('At least one image is required');
        }

        const post = await Post.create({
            title: postData.title,
            image: postData.imageUrl || postData.additionalImages[0], // Используем первое изображение если основное не указано
            additionalImages: postData.additionalImages || [],
            content: postData.content,
            category: postData.category,
            price: postData.price
        });

        return post;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

// edit
async function editPost(id, postData) {
    try {
        const updateData = {
            title: postData.title,
            content: postData.content,
        };

        // Обновляем изображения только если они предоставлены
        if (postData.imageUrl) {
            updateData.image = postData.imageUrl;
        }
        if (postData.additionalImages) {
            updateData.additionalImages = postData.additionalImages;
        }

        const post = await Post.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return post;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

// delete
function deletePost(id) {
    return Post.deleteOne({ _id: id })
}

// get list with search and pagination
async function getPosts(search, limit, page, sort) {
    const query = {};
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }

    const posts = await Post.find(query)
        .sort({ price: sort }) // Сортировка по цене
        .limit(limit)
        .skip((page - 1) * limit);

    const count = await Post.countDocuments(query);
    const lastPage = Math.ceil(count / limit);

    return { posts, lastPage };
}

// get item
function getPost(id) {
    return Post.findById(id).populate({
        path: 'comments',
        populate: 'author'
    });
}

module.exports = {
    addPost,
    editPost,
    deletePost,
    getPosts,
    getPost
}