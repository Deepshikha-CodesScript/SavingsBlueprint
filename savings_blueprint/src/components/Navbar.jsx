import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/styles.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(
  localStorage.getItem("user")
);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Income",
      path: "/income",
    },
    {
      name: "Savings",
      path: "/savings",
    },
    {
      name: "Goals",
      path: "/goals",
    },
    {
      name: "Salary Plans",
      path: "/salary-plans",
    },
     {
      name: "Salary Plans And Fund",
      path: "/savings-plan-fund",
    },
    {
      name: "Forecast",
      path: "/forecast",
    },
    {
      name: "Reports",
      path: "/reports",
    },
    {
      name: "Adjustments",
      path: "/adjustments",
    },
   
  ];

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
     localStorage.removeItem("user");

  // navigate("/login");
  window.location.reload();

    // Reload app
    window.location.reload();

    // Optional redirect
    navigate("/");
  };

  return (
    <nav className="sb-navbar">
      <div className="sb-navbar-container">
        {/* Logo */}
        <Link to="/" className="sb-logo">
          Savings_Blueprint
        </Link>

        {/* Menu */}
        <ul className="sb-nav-menu">
          {menuItems.map((item, index) => (
            <li key={index} className="sb-nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "sb-nav-link active"
                    : "sb-nav-link"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Section */}
        <div className="sb-user-section">
            <span className="sb-user-name">
    Welcome, {user?.name || "User"}
  </span>
          <button className="sb-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;