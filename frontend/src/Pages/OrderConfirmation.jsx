export default function OrderConfirmation() {
  return (
    <div className="px-5 py-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Confirmation</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-700">Thank you for your order!</h3>
        <p className="text-gray-600 mt-4">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
      </div>
    </div>
  );
}
