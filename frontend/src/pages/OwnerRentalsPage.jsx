import { useEffect, useState } from "react";
import "../styles/pages/OwnerRentalsPage.css";
import { apiFetch } from "../utils/api";

function OwnerRentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRental, setSelectedRental] = useState(null);

  const fetchRentals = async () => {
    try {
      const res = await apiFetch("/rentals/admin");
      const data = await res.json();
      setRentals(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  //Earnings calculation
  const calculateEarnings = (rental) => {
    if (
      !rental.startDate ||
      !rental.endDate ||
      !rental.equipment?.pricePerDay
    ) {
      return 0;
    }

    const start = new Date(rental.startDate);
    const end = new Date(rental.endDate);

    const days =
      Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;

    return days * rental.equipment.pricePerDay;
  };

  //Return equipment (JWT SAFE)
  const returnEquipment = async (rentalId) => {
    try {
      await apiFetch(`/rentals/${rentalId}/return`, {
        method: "PUT",
      });
      fetchRentals();
      setSelectedRental(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="center-text">Loading owner rentals...</p>;
  }

  return (
    <div className="owner-rentals-page">
      <h2 className="page-title">📋 Owner Rentals</h2>

      <table className="rentals-table">
        <thead>
          <tr>
            <th>Equipment</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Earnings (₹)</th>
            <th>Details</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rentals.length === 0 ? (
            <tr>
              <td colSpan="7" className="center-text">
                No rentals found.
              </td>
            </tr>
          ) : (
            rentals.map((rental) => (
              <tr key={rental.id}>
                <td>{rental.equipment?.name || "—"}</td>
                <td>{rental.startDate}</td>
                <td>{rental.endDate}</td>
                <td>₹ {calculateEarnings(rental)}</td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedRental(rental)}
                  >
                    View
                  </button>
                </td>

                <td>
                  <span className={`status ${rental.status?.toLowerCase()}`}>
                    {rental.status}
                  </span>
                </td>

                <td>
                  {rental.status === "BOOKED" ? (
                    <button
                      className="return-btn"
                      onClick={() => returnEquipment(rental.id)}
                    >
                      Mark Returned
                    </button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* DETAILS PANEL */}
      {selectedRental && (
        <div className="rental-details">
          <h3>📦 Delivery Details</h3>

          <p>
            <strong>Equipment:</strong>{" "}
            {selectedRental.equipment?.name}
          </p>

          <p>
            <strong>Farmer Name:</strong>{" "}
            {selectedRental.userName || "N/A"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {selectedRental.userEmail || "N/A"}
          </p>

          <p>
            <strong>Contact Number:</strong>{" "}
            {selectedRental.contactNumber || "Not provided"}
          </p>

          <p>
            <strong>Delivery Address:</strong>{" "}
            {selectedRental.deliveryAddress}
          </p>

          <button
            className="close-btn"
            onClick={() => setSelectedRental(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default OwnerRentalsPage;
