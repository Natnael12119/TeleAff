async function submitProduct(event) {
  event.preventDefault(); // Prevent default form submission

  const productName = document.getElementById('productName').value;
  const affiliateLink = document.getElementById('affiliateLink').value;
  const productImage = document.getElementById('productImage').files[0];
  console.log('productName', productName)
  console.log('affiliate', affiliateLink)
  console.log('img', productImage)

  const formData = new FormData();
  formData.append('productName', productName);
  formData.append('affiliateLink', affiliateLink);
  formData.append('productImage', productImage); // Assuming image upload

  try {
    console.log(formData)
    const response = await fetch('/products', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    
  } catch (error) {
    console.error('Error submitting product:', error);
  }
}