import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Paypal({ amount }) {
  return (
    <PayPalScriptProvider options={{ "client-id": "AdH5vmUafgFMOVW4F7HLyQdjmbknbz14x2JBINrZjlHIyIRkSganen0gj5vkxLYsMMTiI9BBMm12rM-i" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}

export default Paypal;