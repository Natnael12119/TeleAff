async function submitProduct(event) {
  event.preventDefault();

  const productName = document.getElementById('productName').value;
  const affiliateLink = document.getElementById('affiliateLink').value;
  const productImage = document.getElementById('productImage').files[0];

  const formData = new FormData();
  formData.append('productName', productName);
  formData.append('affiliateLink', affiliateLink);
  formData.append('productImage', productImage);

  try {
    const response = await fetch('/products', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    alert(data.message); // Display the message to the user
  } catch (error) {
    console.error('Error submitting product:', error);
    
  }
}