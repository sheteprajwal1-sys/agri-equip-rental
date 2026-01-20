import { useEffect, useState } from "react";
import "../styles/pages/OwnerEquipmentPage.css";
import { apiFetch } from "../utils/api";

const CATEGORIES = [
  "Power Equipment",
  "Soil Preparation Equipment",
  "Sowing Equipment",
  "Crop Protection Equipment",
  "Harvesting Equipment",
  "Post-Harvest Equipment",
  "Small-Tractor 20-30 HP ",
  "Big-Tractor 45-75 HP "
];

function OwnerEquipmentPage() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    available: true,
    image: null,
  });

  //LOAD EQUIPMENT
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

  //ADD EQUIPMENT
  const handleAddEquipment = async () => {
    if (!form.name || !form.category || !form.price || !form.image) {
      alert("All fields are required");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("pricePerDay", form.price);
      fd.append("available", form.available);
      fd.append("image", form.image);

      const res = await apiFetch("/equipment", {
        method: "POST",
        body: fd,
      });

      const result = await res.json();

      setEquipment((prev) => [...prev, result.data]);

      //SUCCESS MESSAGE
      setMessage("✅ Equipment added successfully");
      setTimeout(() => setMessage(""), 3000);

      // reset form
      setForm({
        name: "",
        category: "",
        price: "",
        available: true,
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add equipment");
    }
  };

  //UPDATE EQUIPMENT
  const handleSave = async (item) => {
    try {
      // update text fields
      await apiFetch(`/equipment/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: item.name,
          category: item.category,
          pricePerDay: item.pricePerDay,
          available: item.available,
        }),
      });

      // update image only 
      if (item.newImage) {
        const fd = new FormData();
        fd.append("image", item.newImage);

        await apiFetch(`/equipment/${item.id}/image`, {
          method: "PUT",
          body: fd,
        });
      }

      alert("✅ Equipment updated successfully");

      // cleanup temp image
      setEquipment((prev) =>
        prev.map((eq) =>
          eq.id === item.id ? { ...eq, newImage: null } : eq
        )
      );
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };

  //DELETE EQUIPMENT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete equipment?")) return;

    try {
      await apiFetch(`/equipment/${id}`, { method: "DELETE" });
      setEquipment((prev) => prev.filter((e) => e.id !== id));
      alert("🗑️ Equipment deleted successfully");
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="owner-equipment">
      <h2>🚜 Owner Equipment Management</h2>

      {/* SUCCESS MESSAGE */}
      {message && <p className="success-msg">{message}</p>}

      {/* ADD EQUIPMENT */}
      <div className="add-form">
        <input
          placeholder="Equipment name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Price per day"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <label>
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) => setForm({ ...form, available: e.target.checked })}
          />
          Available
        </label>

        <button onClick={handleAddEquipment}>Add Equipment</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price / Day</th>
            <th>Status</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {equipment.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  value={item.name}
                  onChange={(e) =>
                    setEquipment((prev) =>
                      prev.map((eq) =>
                        eq.id === item.id
                          ? { ...eq, name: e.target.value }
                          : eq
                      )
                    )
                  }
                />
              </td>

              <td>
                <select
                  value={item.category}
                  onChange={(e) =>
                    setEquipment((prev) =>
                      prev.map((eq) =>
                        eq.id === item.id
                          ? { ...eq, category: e.target.value }
                          : eq
                      )
                    )
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </td>

              <td>
                <input
                  type="number"
                  value={item.pricePerDay}
                  onChange={(e) =>
                    setEquipment((prev) =>
                      prev.map((eq) =>
                        eq.id === item.id
                          ? { ...eq, pricePerDay: e.target.value }
                          : eq
                      )
                    )
                  }
                />
              </td>

              <td>
                <select
                  value={item.available ? "true" : "false"}
                  onChange={(e) =>
                    setEquipment((prev) =>
                      prev.map((eq) =>
                        eq.id === item.id
                          ? { ...eq, available: e.target.value === "true" }
                          : eq
                      )
                    )
                  }
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </td>

              
              <td>
                <input
                  type="file"
                  onChange={(e) =>
                    setEquipment((prev) =>
                      prev.map((eq) =>
                        eq.id === item.id
                          ? { ...eq, newImage: e.target.files[0] }
                          : eq
                      )
                    )
                  }
                />
              </td>

              <td>
                <button onClick={() => handleSave(item)}>Save</button>
                <button
                  className="danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerEquipmentPage;
