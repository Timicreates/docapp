import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";

const CheckoutPayment = ({
  amount,
  appointmentId,
  backendUrl,
  token,
  onSuccess,
  getUserData,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      try {
        // Call your backend confirmation API
        const { data } = await axios.post(
          backendUrl + "/api/user/payment-confirmation",
          { paymentIntentId: paymentIntent.id, appointmentId },
          { headers: { token } }
        );

        console.log("Payment confirmation response:", data);

        if (data.success) {
          toast.success("Payment confirmed!");
          onSuccess();
          getUserData();
        } else {
          toast.error("Payment not confirmed: " + data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error("Error confirming payment");
      }
    }

    setLoading(false);
  };

  const formatAmount = (amt) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amt);

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded shadow-md max-w-md mx-auto mt-4"
    >
      <div className="mb-4 p-2 bg-gray-100 rounded text-center font-semibold text-lg">
        Amount to Pay: {formatAmount(amount)}
      </div>
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        className="mt-4 w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutPayment;
