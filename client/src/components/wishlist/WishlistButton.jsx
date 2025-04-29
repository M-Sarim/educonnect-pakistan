import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiRequest } from "../../utils/request.js";

const WishlistButton = ({ tutorId }) => {
  const { token } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkWishlist = async () => {
    try {
      const wishlist = await apiRequest(
        "http://localhost:5001/api/wishlist",
        "GET",
        null,
        token
      );
      setInWishlist(wishlist.some((item) => item.tutor._id === tutorId));
    } catch (err) {
      console.error("Error checking wishlist:", err.message);
    }
  };

  const toggleWishlist = async () => {
    setIsLoading(true);
    try {
      if (inWishlist) {
        await apiRequest(
          `http://localhost:5001/api/wishlist/${tutorId}`,
          "DELETE",
          null,
          token
        );
        setInWishlist(false);
      } else {
        await apiRequest(
          `http://localhost:5001/api/wishlist/${tutorId}`,
          "POST",
          null,
          token
        );
        setInWishlist(true);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkWishlist();
  }, [tutorId]);

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: inWishlist ? "#FEE2E2" : "white",
    color: inWishlist ? "#E11D48" : "#64748B",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const hoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const [isHovering, setIsHovering] = useState(false);

  return (
    <button
      onClick={toggleWishlist}
      style={isHovering ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={isLoading}
    >
      <span style={{ fontSize: "18px" }}>{inWishlist ? "❤️" : "🤍"}</span>
      {inWishlist ? "Saved" : "Save"}
    </button>
  );
};

export default WishlistButton;
