import { useEffect, useState } from "react";
import "../styles/pages/MyRentals.css";
import { apiFetch } from "../utils/api";

function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMyRentals() {
      try {
        const res = await apiFetch("/rentals");
        const data = await res.json();
        setRentals(data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load rentals");
      } finally {
        setLoading(false);
      }
    }

    loadMyRentals();
  }, []);

  if (loading) {
    return <p className="rentals-loading">Loading your rentals…</p>;
  }

  if (error) {
    return <p className="no-rentals">{error}</p>;
  }

  return (
    <div className="my-rentals-page">
      <h2 className="rentals-title">📦 My Rentals</h2>
      <p className="rentals-subtitle">
        Track your bookings and total cost.
      </p>

      {rentals.length === 0 ? (
        <p className="no-rentals">No rentals yet.</p>
      ) : (
        <div className="rentals-grid">
          {rentals.map((r) => {
            const days =
              Math.floor(
                (new Date(r.endDate) - new Date(r.startDate)) /
                  (1000 * 60 * 60 * 24)
              ) + 1;

            const total = (r.pricePerDay || 0) * days;

            return (
              <div key={r.id} className="rental-card">
                <div className="card-header">
                  <h3 className="equipment-name">
                    🚜 {r.equipment?.name}
                  </h3>

                  <span
                    className={`status-badge ${
                      r.status === "BOOKED" ? "booked" : "returned"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <div className="card-row">
                  <span>From</span>
                  <span>{r.startDate}</span>
                </div>

                <div className="card-row">
                  <span>To</span>
                  <span>{r.endDate}</span>
                </div>

                <div className="card-row">
                  <span>Price / Day</span>
                  <span>₹{r.pricePerDay}</span>
                </div>

                <div className="card-row total">
                  <span>Total ({days} days)</span>
                  <span>₹{total}</span>
                </div>

                <div className="address">
                  <strong>Delivery Address</strong>
                  <p>{r.deliveryAddress}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyRentals;
