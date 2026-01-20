import { useEffect, useState } from "react";
import "../styles/pages/RentalsPage.css";

function RentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/rentals")
      .then((res) => res.json())
      .then((data) => {
        setRentals(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleReturn = (id) => {
    fetch(`http://localhost:8080/rentals/${id}/return`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => {
        setRentals((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: "RETURNED" } : r
          )
        );
      });
  };

  if (loading) return <p>Loading rentals…</p>;

  return (
    <div className="rentals-page">
      <h2>📋 All Rentals (Owner)</h2>

      <table className="rentals-table">
        <thead>
          <tr>
            <th>Equipment</th>
            <th>User</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((r) => (
            <tr key={r.id}>
              <td>{r.equipment?.name}</td>
              <td>User #{r.userId}</td>
              <td>{r.startDate}</td>
              <td>{r.endDate}</td>
              <td>{r.status}</td>
              <td>
                {r.status === "BOOKED" && (
                  <button onClick={() => handleReturn(r.id)}>
                    Mark Returned
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RentalsPage;
