import { useEffect, useState } from "react";
import "../styles/pages/OwnerDashboard.css";
import { apiFetch } from "../utils/api";

function OwnerDashboard() {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalRentals: 0,
    activeRentals: 0,
  });

  const [equipmentStats, setEquipmentStats] = useState({
    totalEquipment: 0,
    availableEquipment: 0,
  });

  const [earningsTable, setEarningsTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const dashboardRes = await apiFetch("/rentals/dashboard-stats");
        const equipmentRes = await apiFetch("/equipment");
        const rentalsRes = await apiFetch("/rentals/admin");

        const dashboardData = await dashboardRes.json();
        const equipmentData = await equipmentRes.json();
        const rentalsData = await rentalsRes.json();

        setStats(dashboardData.data);

        const equipment = equipmentData.data || [];
        const rentals = rentalsData.data || [];

        setEquipmentStats({
          totalEquipment: equipment.length,
          availableEquipment: equipment.filter(e => e.available).length,
        });

        const map = {};

        rentals.forEach(r => {
          if (
            r.equipment &&
            r.equipment.pricePerDay &&
            r.startDate &&
            r.endDate
          ) {
            const start = new Date(r.startDate);
            const end = new Date(r.endDate);
            const days =
              Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

            const amount = days * r.equipment.pricePerDay;
            const name = r.equipment.name;

            if (!map[name]) {
              map[name] = {
                equipmentName: name,
                totalRentals: 0,
                totalEarnings: 0,
              };
            }

            map[name].totalRentals += 1;
            map[name].totalEarnings += amount;
          }
        });

        setEarningsTable(Object.values(map));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <p className="dashboard-loading">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="dashboard-error">{error}</p>;
  }

  return (
    <div className="owner-dashboard">
      <h2 className="dashboard-title">📊 Owner Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card teal">
          <span className="icon">🚜</span>
          <div>
            <p>Total Equipment</p>
            <h3>{equipmentStats.totalEquipment}</h3>
          </div>
        </div>

        <div className="dashboard-card green">
          <span className="icon">✅</span>
          <div>
            <p>Available Equipment</p>
            <h3>{equipmentStats.availableEquipment}</h3>
          </div>
        </div>

        <div className="dashboard-card orange">
          <span className="icon">📦</span>
          <div>
            <p>Total Rentals</p>
            <h3>{stats.totalRentals}</h3>
          </div>
        </div>

        <div className="dashboard-card purple">
          <span className="icon">⏳</span>
          <div>
            <p>Active Rentals</p>
            <h3>{stats.activeRentals}</h3>
          </div>
        </div>

        <div className="dashboard-card gold">
          <span className="icon">💰</span>
          <div>
            <p>Total Earnings</p>
            <h3>₹ {stats.totalEarnings}</h3>
          </div>
        </div>
      </div>

      
      {/* ✅ EARNINGS TABLE */}
      <h3 className="section-title">💰 Earnings by Equipment</h3>

      {earningsTable.length === 0 ? (
        <p>No completed rentals yet.</p>
      ) : (
        <div className="table-card">
          <table className="earnings-table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Total Rentals</th>
                <th>Total Earnings (₹)</th>
              </tr>
            </thead>
            <tbody>
              {earningsTable.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.equipmentName}</td>
                  <td>{row.totalRentals}</td>
                  <td>₹ {row.totalEarnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
