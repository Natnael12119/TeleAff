async function submitProduct(event) {
	event.preventDefault();

	const productName = document.getElementById('productName').value;
	const affiliateLink = document.getElementById('affiliateLink').value;
	const description = document.getElementById('description').value;
	const productImage = document.getElementById('productImage').files[0];

	const formData = new FormData();
	formData.append('productName', productName);
	formData.append('affiliateLink', affiliateLink);
	formData.append('description', description);
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

			// Redirect to productList.html
			window.location.href = 'http://127.0.0.1:5000/productList';
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

async function fetchProducts() {
	try {
		const response = await fetch('/products');
		const data = await response.json();

		if (response.status === 200) {
			const productList = document.getElementById('productList');

			if (productList) {
				productList.innerHTML = ''; // Clear previous list

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
				console.error('productList element not found');
			}
		} else {
			console.error('Error fetching products:', data.message);
		}
	} catch (error) {
		console.error('Error fetching products:', error);
	}
}

aasync function publishProduct(productId) {
	try {
	  const response = await fetch(`/products/${productId}/publishToTelegram`, {
		method: 'POST',
	  });
  
	  const data = await response.json();
  
	  if (response.status === 200) {
		// Update button text and display success message
		const publishButton = document.querySelector(`[onclick="publishProduct(${productId})"]`);
		publishButton.textContent = "Delete";
		publishButton.onclick = null; // Remove click handler
  
		const successMessage = document.getElementById('successMessage');
		successMessage.textContent = data.message;
		successMessage.style.display = 'block';
	  } else {
		console.error('Error publishing product:', data.message);
	  }
	} catch (error) {
	  console.error('Error publishing product:', error);
	}
  }
  