import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import "./Style.css";

/* ================= HOME PAGE ================= */
function Home({ user, toggleModal, logout }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    alert("Searching destinations... 🚀");
  };

  const destinations = [
    {
      name: "Paris",
      img: "https://img.grouponcdn.com/seocms/3YaoVxvVtppqp52m5ibTpeJrtqAi/Things_to_Do_in_Paris_Eiffel_Tower_jpg-600x430",
      desc: "The city of lights and romance",
    },
    {
      name: "Maldives",
      img: "https://www.tusktravel.com/blog/wp-content/uploads/2019/10/Male-Atoll-Maldives-2.jpg",
      desc: "Relax on stunning beaches",
    },
    {
      name: "Tokyo",
      img: "https://cdn.getyourguide.com/img/tour/58b5fd567645c.jpeg/146.jpg",
      desc: "A blend of tradition and modern life",
    },
  ];

  return (
    <div className="tour-app">
      {/* HEADER */}
      <header className="header">
        <h1>🌍 Travel Planner</h1>
        <nav className="nav-buttons">
          <a href="#search">Search</a>
          <a href="#destinations">Destinations</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>

          {user ? (
            <div className="user-profile" title="Click to logout" onClick={logout}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <button className="login-btn" onClick={toggleModal}>
              Login / Sign Up
            </button>
          )}
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>Discover Your Next Adventure</h2>
        <p>Find the best places around the world at unbeatable prices</p>
        <a href="#search" className="cta-button">
          Start Exploring
        </a>
      </section>

      {/* SEARCH */}
      <section className="search-section" id="search">
        <h3>Search Your Destination</h3>
        <form className="tour-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Destination" required />
          <input type="date" required />
          <input type="date" />
          <button type="submit">Search</button>
        </form>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations" id="destinations">
        <h3>Top Destinations ✈️</h3>
        <div className="card-container">
          {destinations.map((place) => (
            <div className="card" key={place.name}>
              <img src={place.img} alt={place.name} />
              <h4>{place.name}</h4>
              <p>{place.desc}</p>
              <button
                className="book-btn"
                onClick={() => navigate(`/book/${place.name}`)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h3>What Our Travelers Say ❤️</h3>
        <div className="testimonial-container">
          <div className="testimonial">
            <p>“Best travel planner ever! My trip was smooth and unforgettable.”</p>
            <h5>– Sarah, USA</h5>
          </div>
          <div className="testimonial">
            <p>“Amazing service with great deals. Highly recommended!”</p>
            <h5>– Rahul, India</h5>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter" id="contact">
        <h3>Subscribe for Travel Deals 📩</h3>
        <form>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 Travel Planner. All rights reserved.</p>
      </footer>
    </div>
  );
}

/* ================= BOOKING PAGE ================= */
function BookingPage() {
  const { destination } = useParams();
  const navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookingDetails = Object.fromEntries(formData.entries());
    bookingDetails.destination = destination;
    navigate("/confirm", { state: bookingDetails });
  };

  return (
    <div className="booking-page">
      <header className="header">
        <h1>🧳 Book Your Trip to {destination}</h1>
        <Link to="/" className="login-btn">
          ⬅ Back
        </Link>
      </header>

      <section className="booking-form-section">
        <h3>Fill Your Travel Details</h3>
        <form className="booking-form" onSubmit={handleBooking}>
          <input type="text" name="fullname" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="date" name="date" required />
          <input type="number" name="travelers" placeholder="Number of Travelers" min="1" required />
          <textarea name="requests" placeholder="Special Requests" rows="4"></textarea>
          <button type="submit" className="submit-btn">
            Next ➡
          </button>
        </form>
      </section>

      <footer className="footer">
        <p>© 2025 Travel Planner. Safe Travels!</p>
      </footer>
    </div>
  );
}

/* ================= BOOKING CONFIRMATION PAGE ================= */
function BookingSummary() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate("/");
    return null;
  }

  const handleConfirm = () => {
    alert(`🎉 Your trip to ${state.destination} is confirmed!\nBon Voyage ✈️`);
    navigate("/");
  };

  return (
    <div className="booking-summary">
      <header className="header">
        <h1>✅ Confirm Your Booking</h1>
        <Link to="/" className="login-btn">
          ⬅ Home
        </Link>
      </header>

      <section className="summary-section">
        <h3>Trip Summary</h3>
        <div className="summary-box">
          <p><strong>Destination:</strong> {state.destination}</p>
          <p><strong>Name:</strong> {state.fullname}</p>
          <p><strong>Email:</strong> {state.email}</p>
          <p><strong>Date:</strong> {state.date}</p>
          <p><strong>Travelers:</strong> {state.travelers}</p>
          <p><strong>Requests:</strong> {state.requests || "None"}</p>
        </div>

        <button className="submit-btn" onClick={handleConfirm}>
          Confirm Booking
        </button>
      </section>

      <footer className="footer">
        <p>© 2025 Travel Planner. Bon Voyage!</p>
      </footer>
    </div>
  );
}

/* ================= MAIN APP ================= */
function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setActiveTab("login");
    setMessage("");
  };

  const logout = () => setUser(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} toggleModal={toggleModal} logout={logout} />} />
        <Route path="/book/:destination" element={<BookingPage />} />
        <Route path="/confirm" element={<BookingSummary />} />
      </Routes>

      {/* LOGIN MODAL */}
      {showModal && (
        <div className="login-modal">
          <div className="login-box">
            <div className="tabs">
              <button
                className={activeTab === "login" ? "tab active" : "tab"}
                onClick={() => {
                  setActiveTab("login");
                  setMessage("");
                }}
              >
                Login
              </button>
              <button
                className={activeTab === "signup" ? "tab active" : "tab"}
                onClick={() => {
                  setActiveTab("signup");
                  setMessage("");
                }}
              >
                Sign Up
              </button>
            </div>

            {message ? (
              <div className="success-message">{message}</div>
            ) : activeTab === "login" ? (
              <form
                className="form-content"
                onSubmit={(e) => {
                  e.preventDefault();
                  try {
                    const email = e.target.elements.email.value.trim();
                    const password = e.target.elements.password.value.trim();
                    if (!email || !password) throw new Error("Please fill all fields!");

                    const name = email.split("@")[0];
                    setUser({ name });
                    setMessage("✅ Successfully Logged In!");
                    setTimeout(() => setShowModal(false), 1200);
                  } catch (err) {
                    alert("⚠️ " + err.message);
                  }
                }}
              >
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit" className="submit-btn">Login</button>
              </form>
            ) : (
              <form
                className="form-content"
                onSubmit={(e) => {
                  e.preventDefault();
                  try {
                    const fullname = e.target.elements.fullname.value.trim();
                    const email = e.target.elements.email.value.trim();
                    const password = e.target.elements.password.value.trim();
                    const confirm = e.target.elements.confirm.value.trim();

                    if (!fullname || !email || !password || !confirm)
                      throw new Error("All fields are required!");
                    if (password !== confirm)
                      throw new Error("Passwords do not match!");

                    setUser({ name: fullname });
                    setMessage("🎉 Account Created Successfully!");
                    setTimeout(() => setShowModal(false), 1200);
                  } catch (err) {
                    alert("❌ " + err.message);
                  }
                }}
              >
                <input type="text" name="fullname" placeholder="Full Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="confirm" placeholder="Confirm Password" required />
                <button type="submit" className="submit-btn">Sign Up</button>
              </form>
            )}

            <button className="close-btn" onClick={toggleModal}>✖</button>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
