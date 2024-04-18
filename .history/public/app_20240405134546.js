const saveProduct = async () => {
    const productName = document.getElementById('productName').value;
    const affiliateLink = document.getElementById('affiliateLink').value;
    const productImage = document.getElementById('productImage').files[0]; // Access file object
  
    const formData = new FormData(); // Create FormData for image upload
    formData.append('productName', productName);
    formData.append('affiliateLink', affiliateLink);
    formData.append('productImage', productImage); // Append image file
  
    try {
      const response = await fetch('/products', {
        method: 'POST',
        body: formData // Send form data
      });
      const data = await response.json();
      console.log(data); // Handle success response
    } catch (error) {
      console.error(error);
      // Handle errors (e.g., display error message to user)
    }
  };  