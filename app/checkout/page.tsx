"use client";
import { useCartStore } from "@/store/StoreSlice";
import Link from "next/link";
import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  cardNumber: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  cardNumber?: string;
}

const CheckoutPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    cardNumber: "",
  });
  const {clearCart} = useCartStore()
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setErrors({});
      setSubmissionStatus("success");
      clearCart()

      setFormData({
        name: "",
        email: "",
        cardNumber: "",
      });
    } catch (error) {
      console.error("Submission failed", error);
      setSubmissionStatus("error");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "cardNumber" ? value.replace(/\D/g, "").slice(0, 16) : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submissionStatus === "success") {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Purchase Completed Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. We&apos;ll send a confirmation email
            shortly.
          </p>
          <Link href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return 
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Secure Checkout
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none 
                ${
                  errors.name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none 
                ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Card Number Input */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength={16}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none 
                ${
                  errors.cardNumber
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
          >
            {isSubmitting ? "Processing..." : "Complete Purchase"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
