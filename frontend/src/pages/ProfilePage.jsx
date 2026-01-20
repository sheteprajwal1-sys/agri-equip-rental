import "../styles/pages/Profile.css";

function ProfilePage({ user }) {
  if (!user) {
    return <p className="center-text">No user data available</p>;
  }

  const roleLabel =
    user.role === "ADMIN" ? "Equipment Owner" : "Farmer";

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="profile-avatar"
          />
          <h2 className="profile-name">{user.name}</h2>

          <span
            className={`role-badge ${
              user.role === "ADMIN" ? "owner" : "farmer"
            }`}
          >
            {roleLabel}
          </span>
        </div>

        {/* DETAILS */}
        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">📧 Email</span>
            <span className="detail-value">{user.email}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">👤 Account Type</span>
            <span className="detail-value">{roleLabel}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
