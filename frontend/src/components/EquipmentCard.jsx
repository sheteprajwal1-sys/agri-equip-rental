import { useState } from "react";
import "../styles/components/EquipmentCard.css";

function EquipmentCard({ equipment, onBook }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState(""); 
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);

  const imageSrc =
    equipment.imageUrl ||
    equipment.imagePath ||
    null;

  const price =
    equipment.price ??
    equipment.pricePerDay ??
    equipment.rentPerDay ??
    null;

  const isAvailable = equipment.available === true && price !== null;

  const validateBooking = () => {
    if (!startDate || !endDate) {
      setError("Please select start and end dates");
      return false;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("End date cannot be before start date");
      return false;
    }

    if (!address.trim()) {
      setError("Please enter delivery address");
      return false;
    }

    if (!/^\d{10}$/.test(contact)) {
      setError("Enter valid 10-digit contact number");
      return false;
    }


    setError("");
    return true;
  };

  const handleBookClick = async () => {
    if (!validateBooking()) return;

    setBooking(true);

    try {
      await onBook(
        equipment,
        startDate,
        endDate,
        address,
        contact 
      );

      setStartDate("");
      setEndDate("");
      setAddress("");
      setContact("");
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="equipment-card">
      <div className="equipment-img-wrapper">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={equipment.name}
            className="equipment-img"
          />
        ) : (
          <div className="equipment-img placeholder">
            No Image Available
          </div>
        )}

       <span className={`equipment-badge ${isAvailable ? "available" : "unavailable"}`}>
          🚜 {equipment.name}
       </span>

      </div>

      <p className="equipment-price">
        {price ? `₹ ${price} / day` : "Price not set"}
      </p>

      <div className="date-fields">
        <input
          type="date"
          value={startDate}
          disabled={!isAvailable || booking}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          disabled={!isAvailable || booking}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      
      <input
        type="tel"
        className="contact-field"
        placeholder="Contact number"
        value={contact}
        disabled={!isAvailable || booking}
        onChange={(e) => setContact(e.target.value)}
      />

      <textarea
        className="address-field"
        placeholder="Delivery address (village, taluka, district)"
        value={address}
        disabled={!isAvailable || booking}
        onChange={(e) => setAddress(e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}

      <button
        className="book-btn"
        disabled={!isAvailable || booking}
        onClick={handleBookClick}
      >
        {booking
          ? "Booking..."
          : equipment.available === false
          ? "Already Booked"
          : price === null
          ? "Unavailable"
          : "Book Now"}
      </button>

      {!isAvailable && (
        <p className="helper-text">
          {equipment.available === false
            ? "This equipment is already rented"
            : "Price not set by owner"}
        </p>
      )}
    </div>
  );
}

export default EquipmentCard;
