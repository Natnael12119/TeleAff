// Function to handle product submission
async function submitProduct(event) {
	event.preventDefault();

	// Retrieve form data
	const productName = document.getElementById('productName').value;
	const affiliateLink = document.getElementById('affiliateLink').value;
	const description = document.getElementById('description').value;
	const productImage = document.getElementById('productImage').files[0];

	// Construct FormData object
	const formData = new FormData();
	formData.append('productName', productName);
	formData.append('affiliateLink', affiliateLink);
	formData.append('description', description);
	formData.append('productImage', productImage);

	try {
		// Send form data to server
		const response = await fetch('/products', {
			method: 'POST',
			body: formData,
		});

		// Parse JSON response
		const data = await response.json();

		// Handle response based on status
		if (response.status === 201) {
			// Display success message and redirect to productList.html
			const successMessage = document.getElementById('successMessage');
			successMessage.textContent = data.message;
			successMessage.style.display = 'block';

			const errorMessage = document.getElementById('errorMessage');
			errorMessage.style.display = 'none';

			window.location.href = 'http://127.0.0.1:5000/productList';
		} else {
			// Display error message
			const errorMessage = document.getElementById('errorMessage');
			errorMessage.textContent = data.message;
			errorMessage.style.display = 'block';

			const successMessage = document.getElementById('successMessage');
			successMessage.style.display = 'none';
		}
	} catch (error) {
		// Handle error
		console.error('Error submitting product:', error);
		const errorMessage = document.getElementById('errorMessage');
		errorMessage.textContent = 'Error submitting product';
		errorMessage.style.display = 'block';
	}
}

// Function to fetch unpublished products and display them
async function fetchProducts() {
	try {
		// Fetch unpublished products from server
		const response = await fetch('/products');
		const data = await response.json();

		// Clear previous list and populate with fetched products
		if (response.status === 200) {
			const productList = document.getElementById('productList');
			productList.innerHTML = '';

			data.data.forEach((product) => {
				const listItem = document.createElement('li');
				listItem.innerHTML = `
                    <strong>${product.productName}</strong> - ${product.description}
                    <br>
                    <img src="${product.image}" alt="${product.productName}" style="max-width: 200px;">
                    <button onclick="publishProduct(${product.id})">Publish</button>
                `;
				productList.appendChild(listItem);
			});
		} else {
			console.error('Error fetching products:', data.message);
		}
	} catch (error) {
		console.error('Error fetching products:', error);
	}
}

// Function to publish a product
async function publishProduct(productId) {
	try {
		// Send PUT request to publish product
		const response = await fetch(`/products/${productId}/publish`, {
			method: 'PUT',
		});

		// Parse JSON response
		const data = await response.json();

		// Refresh product list on successful publish
		if (response.status === 200) {
			fetchProducts();
		} else {
			console.error('Error publishing product:', data.message);
		}
	} catch (error) {
		console.error('Error publishing product:', error);
	}
}

// Load products when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
	fetchProducts();
});
