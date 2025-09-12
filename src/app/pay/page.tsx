'use client';

import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, CreditCardIcon, CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";

export default function PayBill() {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    amount: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="font-megrim text-2xl text-purple">G3 Electric</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Success Message */}
        <div className="min-h-screen flex items-center justify-center bg-white-smoke">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="font-megrim text-3xl text-earle-black mb-4" style={{color: '#242729'}}>Payment Successful!</h1>
              <p className="font-raleway text-earle-black mb-6" style={{color: '#242729'}}>
                Thank you for your payment. Your invoice has been processed and you will receive a confirmation email shortly.
              </p>
            <div className="space-y-4">
              <Link 
                href="/" 
                className="w-full bg-purple text-white py-3 px-6 rounded-lg font-montserrat font-semibold hover:bg-phlox transition-colors inline-block"
              >
                Return to Home
              </Link>
              <Link 
                href="/contact" 
                className="w-full border border-purple text-purple py-3 px-6 rounded-lg font-montserrat font-semibold hover:bg-purple hover:text-white transition-colors inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earle-black">
        {/* Navigation */}
        <Navigation currentPath="/pay" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-white hover:text-white-smoke transition-colors">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">Pay Your Bill</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            Quick and secure online payment for your G3 Electric services. Safe, fast, and convenient.
          </p>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <CreditCardIcon className="h-12 w-12 text-purple mx-auto mb-4" />
              <h2 className="font-montserrat text-2xl font-semibold text-earle-black mb-2" style={{color: '#242729'}}>Secure Payment</h2>
              <p className="font-raleway text-earle-black" style={{color: '#242729'}}>Enter your invoice details and payment information</p>
            </div>

            {paymentStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-3" />
                <p className="font-raleway text-red-700">Payment failed. Please check your information and try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Invoice Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4" style={{color: '#242729'}}>Invoice Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="invoiceNumber" className="block font-montserrat text-sm font-medium text-earle-black mb-2" style={{color: '#242729'}}>
                      Invoice Number *
                    </label>
                    <input
                      type="text"
                      id="invoiceNumber"
                      name="invoiceNumber"
                      required
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="e.g., INV-2024-001"
                      aria-describedby="invoiceNumber-error"
                    />
                  </div>
                  <div>
                    <label htmlFor="amount" className="block font-montserrat text-sm font-medium text-earle-black mb-2" style={{color: '#242729'}}>
                      Amount *
                    </label>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      required
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="$0.00"
                      aria-describedby="amount-error"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block font-montserrat text-sm font-medium text-earle-black mb-2" style={{color: '#242729'}}>
                    Email Address *
                  </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="your.email@example.com"
                      aria-describedby="email-error"
                    />
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4" style={{color: '#242729'}}>Payment Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block font-montserrat text-sm font-medium text-earle-black mb-2" style={{color: '#242729'}}>
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      aria-describedby="cardNumber-error"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block font-montserrat text-sm font-medium text-earle-black mb-2" style={{color: '#242729'}}>
                        Expiry Date *
                      </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="MM/YY"
                      maxLength={5}
                      aria-describedby="expiryDate-error"
                    />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block font-montserrat text-sm font-medium text-earle-black mb-2" style={{color: '#242729'}}>
                        CVV *
                      </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="123"
                      maxLength={4}
                      aria-describedby="cvv-error"
                    />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cardholderName" className="block font-montserrat text-sm font-medium text-earle-black mb-2" style={{color: '#242729'}}>
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      name="cardholderName"
                      required
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="John Doe"
                      aria-describedby="cardholderName-error"
                    />
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-montserrat text-sm font-semibold text-blue-800 mb-1">Secure Payment</h4>
                    <p className="font-raleway text-sm text-blue-700">
                      Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={paymentStatus === 'processing'}
                className="btn-primary w-full text-lg py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paymentStatus === 'processing' ? 'Processing Payment...' : 'Pay Now'}
              </button>

              <p className="font-raleway text-sm text-earle-black text-center" style={{color: '#242729'}}>
                By clicking &quot;Pay Now&quot;, you agree to our terms of service and privacy policy.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white-smoke py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-montserrat text-2xl text-earle-black mb-4">G3 Electric</h3>
            <p className="font-raleway text-earle-black mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-earle-black hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-earle-black hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-earle-black hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-earle-black hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-earle-black hover:text-purple font-raleway">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
