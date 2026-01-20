import { useEffect, useState } from "react";
import EquipmentCard from "./EquipmentCard";
import "../styles/components/EquipmentList.css";
import { apiFetch } from "../utils/api";

function EquipmentList({ search, category, sort }) {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  //get logged-in user (only for display/info)
  const storedUser = JSON.parse(localStorage.getItem("user"));

  //load equipment
  useEffect(() => {
    async function loadEquipment() {
      try {
        const res = await apiFetch("/equipment");
        const data = await res.json();
        setEquipment(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadEquipment();
  }, []);

  //Book Equipment (JWT Decides User)
  const handleBook = async (item, startDate, endDate, address, contact) => {
    const payload = {
      userName: storedUser?.name,
      userEmail: storedUser?.email,
      equipment: { id: item.id },
      startDate,
      endDate,
      deliveryAddress: address,
      contactNumber: contact,
      status: "BOOKED",
    };

    try {
      const res = await apiFetch("/rentals", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      
      setEquipment((prev) =>
        prev.map((eq) =>
          eq.id === item.id ? { ...eq, available: false } : eq
        )
      );

      setMessage("✅ Booking confirmed!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Booking failed.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <p>Loading equipment...</p>;

  

  let filtered = [...equipment];

  if (search) {
    filtered = filtered.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category !== "ALL") {
    filtered = filtered.filter((e) => e.category === category);
  }

  if (sort === "LOW_HIGH") {
    filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
  }

  if (sort === "HIGH_LOW") {
    filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
  }

  return (
    <>
      {message && <div className="booking-toast">{message}</div>}

      <div className="equipment-list">
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            No equipment found for selected filters.
          </p>
        ) : (
          filtered.map((item) => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              onBook={handleBook}
            />
          ))
        )}
      </div>
    </>
  );
}

export default EquipmentList;
