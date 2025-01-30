document.addEventListener('DOMContentLoaded', () => {
  const appId = 'YOUR_SQUARE_APPLICATION_ID';
  const locationId = 'YOUR_SQUARE_LOCATION_ID';

  const payments = Square.payments(appId, locationId);

  async function initializeSquare() {
    const card = await payments.card();
    await card.attach('#card-container');

    const cardButton = document.getElementById('card-button');
    cardButton.addEventListener('click', async () => {
      const result = await card.tokenize();
      if (result.status === 'OK') {
        const token = result.token;
        // Send the token to your server to process the payment
        processPayment(token);
      } else {
        alert('Payment failed. Please try again.');
      }
    });
  }

  async function processPayment(token) {
    const response = await fetch('/process-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    const result = await response.json();
    if (result.success) {
      alert('Payment successful!');
    } else {
      alert('Payment failed. Please try again.');
    }
  }

  initializeSquare();
});
