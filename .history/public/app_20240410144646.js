const submitProduct = async (event) => {
  event.preventDefault();

  const productName = document.getElementById('productName').value;
  const affiliateLink = document.getElementById('affiliateLink').value;
  const productImage = document.getElementById('productImage').files[0];  // If you want to get the image file
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const formData = new FormData();
  formData.append('productName', productName);  // Updated key name
  formData.append('affiliateLink', affiliateLink);  // Updated key name
  formData.append('productImage', productImage);
  formData.append('createdAt', createdAt);
  formData.append('updatedAt', updatedAt);

  try {
      const response = await fetch('/products', {
          method: 'POST',
          body: formData,
      });

      const data = await response.json();

      if (data.success) {
          // Handle success
          console.log('Product created successfully:', data.product);
      } else {
          // Handle error
          console.error('Error creating product:', data.error);
      }
  } catch (error) {
      console.error('Error:', error);
  }
};
