"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export interface TicketTier {
  Guid_BuyIn: number | string;
  Int_NumbTicket: string;
  Dec_Price: number;
  description?: string;
}

interface TicketPurchaseProps {
  tickets: TicketTier[];
  raffleID: string;
  charity_key: string;
}

function isInOntario(latitude: number, longitude: number): boolean {
  const minLat = parseFloat(process.env.NEXT_PUBLIC_ONTARIO_MIN_LAT!);
  const maxLat = parseFloat(process.env.NEXT_PUBLIC_ONTARIO_MAX_LAT!);
  const minLng = parseFloat(process.env.NEXT_PUBLIC_ONTARIO_MIN_LNG!);
  const maxLng = parseFloat(process.env.NEXT_PUBLIC_ONTARIO_MAX_LNG!);

  return (
    latitude >= minLat &&
    latitude <= maxLat &&
    longitude >= minLng &&
    longitude <= maxLng
  );
}

export default function TicketPurchase({
  tickets,
  raffleID,
  charity_key,
}: TicketPurchaseProps) {
  const [counts, setCounts] = useState<Record<string, number>>(
    tickets.reduce((acc, t) => ({ ...acc, [t.Guid_BuyIn]: 0 }), {})
  );
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [showManualConfirm, setShowManualConfirm] = useState(false);

  const increment = (Guid_BuyIn: string | number) =>
    setCounts((c) => ({ ...c, [Guid_BuyIn]: c[Guid_BuyIn] + 1 }));
  const decrement = (Guid_BuyIn: string | number) =>
    setCounts((c) => ({
      ...c,
      [Guid_BuyIn]: Math.max((c[Guid_BuyIn] || 0) - 1, 0),
    }));

  const total = tickets.reduce(
    (sum, t) => sum + (counts[t.Guid_BuyIn] || 0) * t.Dec_Price,
    0
  );

  const proceedToStripe = async () => {
    const selectedTickets = tickets
      .filter((t) => (counts[t.Guid_BuyIn] || 0) > 0)
      .map((t) => ({
        Int_NumbTicket: t.Int_NumbTicket,
        Dec_Price: t.Dec_Price,
        quantity: counts[t.Guid_BuyIn] || 0,
        Guid_BuyIn: t.Guid_BuyIn,
        Total_Price: t.Dec_Price * counts[t.Guid_BuyIn],
      }));

    const payload = {
      tickets: selectedTickets,
      raffleId: raffleID,
      total_price: total,
      charity_key,
    };

    const res = await fetch("/api/checkout-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const { sessionId } = await res.json();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
      {
        stripeAccount: charity_key,
      }
    );

    const { error } = await stripe!.redirectToCheckout({ sessionId });
    if (error) console.error(error);
  };

  const handleCheckout = async () => {
    const selectedTickets = tickets.filter((t) => (counts[t.Guid_BuyIn] || 0) > 0);
    if (selectedTickets.length === 0 || !isAgeConfirmed) return;

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        if (!isInOntario(latitude, longitude)) {
          alert("This raffle is only available to residents of Ontario.");
          return;
        }
        await proceedToStripe();
      },
      () => {
        // Location denied or failed — show custom modal fallback
        setShowManualConfirm(true);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 text-center">
        Purchase Tickets
      </h2>

      {tickets.map((t) => (
        <div key={t.Guid_BuyIn} className="flex items-center justify-between">
          <span className="text-gray-800">
            {t.Int_NumbTicket} tickets for ${t.Dec_Price}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => decrement(t.Guid_BuyIn)}
              className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              −
            </button>
            <span className="w-6 text-center">{counts[t.Guid_BuyIn] || 0}</span>
            <button
              onClick={() => increment(t.Guid_BuyIn)}
              className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900">Total:</span>
        <span className="font-bold text-gray-900">${total}</span>
      </div>

      <label className="flex items-center space-x-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={isAgeConfirmed}
          onChange={() => setIsAgeConfirmed((prev) => !prev)}
          className="form-checkbox h-4 w-4 text-indigo-600"
        />
        <span>I confirm that I am 18 years or older</span>
      </label>

      <button
        onClick={handleCheckout}
        disabled={total === 0 || !isAgeConfirmed}
        className="w-full py-2 rounded bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {total === 0 ? "Purchase Tickets" : "Checkout"}
      </button>

      {/* Manual Location Confirmation Modal */}
      {showManualConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm space-y-4 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Location Permission Denied
            </h3>
            <p className="text-sm text-gray-700">
              We couldn't access your location. This raffle is only available in Ontario. If you are currently in Ontario, you can confirm manually below.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={async () => {
                  setShowManualConfirm(false);
                  await proceedToStripe();
                }}
                className="px-4 py-2 bg-rose-400 text-white rounded hover:bg-green-400"
              >
                I am in Ontario
              </button>
              <button
                onClick={() => setShowManualConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
