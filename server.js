const express = require('express');
const bodyParser = require('body-parser');
const squareConnect = require('square-connect');

const app = express();
app.use(bodyParser.json());

const accessToken = 'YOUR_SQUARE_ACCESS_TOKEN';
const locationId = 'YOUR_SQUARE_LOCATION_ID';

squareConnect.ApiClient.instance.authentications['oauth2'].accessToken = accessToken;

app.post('/process-payment', async (req, res) => {
  const { token } = req.body;
  const paymentsApi = new squareConnect.PaymentsApi();

  const requestBody = {
    source_id: token,
    amount_money: {
      amount: 100, // Replace with the total amount from the cart
      currency: 'USD',
    },
    idempotency_key: crypto.randomUUID(),
  };

  try {
    const response = await paymentsApi.createPayment(requestBody);
    res.json({ success: true, payment: response.payment });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
