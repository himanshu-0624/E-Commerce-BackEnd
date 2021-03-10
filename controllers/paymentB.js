var braintree = require("braintree");

var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   '2bq4srxh84pt67gs',
  publicKey:    'c3j84d64m2b3gktt',
  privateKey:   'a7cba7400121c01b74de1005412b36c0'
});



exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err) {
            res.status(500).send(err);
        }
        else {
        //  console.log( "RESPONSE ",response)
            res.send(response);
        }
      });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale(
      {
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
                  res.status(500).send(err);
          }
          else {
              res.json(result);
          }
      });
}