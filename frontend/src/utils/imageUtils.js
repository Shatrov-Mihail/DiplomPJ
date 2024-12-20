export const uploadImage = async (file) => {
	const formData = new FormData();
	formData.append('image', file);

	const response = await fetch('http://localhost:3001/upload', {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Ошибка загрузки изображения');
	}

	const data = await response.json();
	return data.url;
};
