async function submitProduct(event) {
	event.preventDefault();

	const productName = document.getElementById('product_name').value;
	const affiliateLink = document.getElementById('affiliate_link').value;
	const productImage = document.getElementById('productImage').files[0];

	const formData = new FormData();
	formData.append('product_name', productName);
	formData.append('affiliate_link', affiliateLink);
	formData.append('productImage', productImage);

	try {
		const response = await fetch('/products', {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (response.status === 201) {
			const successMessage = document.getElementById('successMessage');
			successMessage.textContent = data.message;
			successMessage.style.display = 'block';

			const errorMessage = document.getElementById('errorMessage');
			errorMessage.style.display = 'none';
		} else {
			const errorMessage = document.getElementById('errorMessage');
			errorMessage.textContent = data.message;
			errorMessage.style.display = 'block';

			const successMessage = document.getElementById('successMessage');
			successMessage.style.display = 'none';
		}
	} catch (error) {
		console.error('Error submitting product:', error);
		const errorMessage = document.getElementById('errorMessage');
		errorMessage.textContent = 'Error submitting product';
		errorMessage.style.display = 'block';
	}
}
