import { useState } from "react";
import EquipmentList from "../components/EquipmentList";
import "../styles/pages/EquipmentPage.css";

function EquipmentPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("NONE");

  return (
    <div className="equipment-page">
      <h2 className="equipment-title">🚜 Available Farm Equipment</h2>

      <p className="equipment-subtitle">
        Choose the right tools to grow smarter and faster.
      </p>

      {/* Search Bar */}
      <div className="equipment-filters">
        <input
          type="text"
          placeholder="Search equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          <option value="Power Equipment">Power Equipment</option>
          <option value="Soil Preparation Equipment">
            Soil Preparation Equipment
          </option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="NONE">Sort by Price</option>
          <option value="LOW_HIGH">Low → High</option>
          <option value="HIGH_LOW">High → Low</option>
        </select>
      </div>

      <EquipmentList
        search={search}
        category={category}
        sort={sort}
      />
    </div>
  );
}

export default EquipmentPage;
