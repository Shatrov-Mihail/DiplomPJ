const Product = require('../models/Product')

// add
async function addProduct(productData) {
    try {
        // Проверяем наличие изображений
        if (!productData.imageUrl && (!productData.additionalImages || !productData.additionalImages.length)) {
            throw new Error('At least one image is required');
        }

        const product = await Product.create({
            title: productData.title,
            image: productData.imageUrl || productData.additionalImages[0], // Используем первое изображение если основное не указано
            additionalImages: productData.additionalImages || [],
            content: productData.content,
            category: productData.category,
            price: productData.price
        });

        return product;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

// edit
async function editProduct(id, productData) {
    try {
        const updateData = {
            title: productData.title,
            content: productData.content,
            price: productData.price,
            category: productData.category,
        };

        // Обновляем изображения только если они предоставлены
        if (productData.imageUrl) {
            updateData.image = productData.imageUrl;
        }
        if (productData.additionalImages) {
            updateData.additionalImages = productData.additionalImages;
        }

        const product = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return product;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

// delete
function deleteProduct(id) {
    return Product.deleteOne({ _id: id })
}

// get list with search and pagination
async function getProductsList(search, limit, page, sort) {
    const query = {};
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }

    const productsList = await Product.find(query)
        .sort({ price: sort }) // Сортировка по цене
        .limit(limit)
        .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);
    const lastPage = Math.ceil(count / limit);

    return { productsList, lastPage };
}

// get item
function getProduct(id) {
    return Product.findById(id);
}

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getProductsList,
    getProduct
}