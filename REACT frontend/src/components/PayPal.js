import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default class PayPal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <PayPalButton
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: this.props.value
                    }
                }],
            });
        }}
        onApprove={(data, actions) => {
            // Capture the funds from the transaction
            return actions.order.capture().then(function(details) {
            // Show a success message to your buyer
                alert("Transaction completed by " + details.payer.name.given_name);

                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                method: "post",
                body: JSON.stringify({
                    orderID: data.orderID
                })
            });
            });
        }}
        options={{clientId: "AQvTpv2WYVN0L8Pw6Xssv9DKrJrAFFTQJzIozlaE4PZqcDoaX81EiMYq9nqbI4AGk6Q3msoGcsEfLa9z"}}
        />
    );
  }
}
