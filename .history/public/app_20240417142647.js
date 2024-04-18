async function submitProduct(event) {
	event.preventDefault();

	const productName = document.getElementById('productName').value;
	const description = document.getElementById('description').value; // Add this line for description
	const affiliateLink = document.getElementById('affiliateLink').value;
	const productImage = document.getElementById('productImage').files[0];

	const formData = new FormData();
	formData.append('productName', productName);
	formData.append('description', description); // Add this line for description
	formData.append('affiliateLink', affiliateLink);
	formData.append('productImage', productImage);

	try {
		const response = await fetch('/products', {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (response.status === 201) {
			// Success message
			const successMessage = document.getElementById('successMessage');
			successMessage.textContent = data.message;
			successMessage.style.display = 'block';

			// Clear error message if exists
			const errorMessage = document.getElementById('errorMessage');
			errorMessage.style.display = 'none';
		} else {
			// Error message
			const errorMessage = document.getElementById('errorMessage');
			errorMessage.textContent = data.message;
			errorMessage.style.display = 'block';

			// Clear success message if exists
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

async function fecchUnpublishedProducts() {
	try {
		const response = await fetch('/products');
		const data = await response.json();

		if (response.status === 200) {
			const products = data.data;
			const productList = document.getElementById('productList');

			products.forEach((product) => {
				const listItem = document.createElement('li');
				listItem.textContent = product.productName;
				productList.appendChild(listItem);
			});
		} else {
			console.error('Error fetching products:', data.message);
		}
	} catch (error) {
		console.error('Error fetching products:', error);
	}
}
