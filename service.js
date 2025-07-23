// service.js
const axios = require('axios');
// Example service function to process incoming data
function order(req,res,orderdata) {
    link_id = req.query.link_id
    link_amount = req.query.link_amount
    customer_phone = req.query.customer_phone
    const headers = {
        'x-client-id': 'TEST10700861a1df40d8f3190080320a16800701',
        'x-client-secret': 'cfsk_ma_test_1ced236db0806708a4b50bd0d20b2a1f_d8b55e48',
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      };
    const data = {
        link_id: link_id,
        link_amount: link_amount,
        link_currency: 'INR',
        link_purpose: 'Water order',
        customer_details: {
          customer_phone: customer_phone
        },
        link_notify: {
          send_sms: true,
          send_email: true
        }
      };
      axios.post('https://sandbox.cashfree.com/pg/links', data, { headers })
        .then(response => {
          //console.log('Cashfree Response:', response.data);
            url = response.data.link_url
            link_id = response.data.link_id
            response_data = {
                link_url: url,
                link_id: link_id
            }
            console.log(response_data)
            res.json(response_data)
            
        })
        .catch(error => {
          console.error('Cashfree Error:', error.response ? error.response.data : error.message);
          res.json("Error")
        });
      
}


function confirmorder(req, res) {
  const headers = {
    'x-client-id': 'TEST10700861a1df40d8f3190080320a16800701',
    'x-client-secret': 'cfsk_ma_test_1ced236db0806708a4b50bd0d20b2a1f_d8b55e48',
    'x-api-version': '2023-08-01',
    'Content-Type': 'application/json'
  };

  const linkId = req.query.link_id;

  axios
    .get(`https://sandbox.cashfree.com/pg/links/${linkId}/orders`, { headers })
    .then(response => {
      console.log('Cashfree Response:', response.data[0].order_status);
      if (response.data[0].order_status=="PAID"){
        res.json({
          "status":"success"
        })
      }
      else{
        res.json({
          "status":"failed"
        })
      }
    })
    .catch(error => {
      console.error(
        'Cashfree Error:',
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ error: 'Error fetching order status from Cashfree' });
    });
}


function getWelcomeMessage() {
  return '✅ API is running from routes.js (via service.js)';
}

module.exports = {
  order,
  getWelcomeMessage,
  confirmorder
};
