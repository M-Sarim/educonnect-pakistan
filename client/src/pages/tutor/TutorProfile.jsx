import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiRequest } from "../../utils/request.js";

const TutorProfile = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    qualifications: "",
    subjects: "",
    hourlyRate: "",
    preferences: "online",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await apiRequest(
          "http://localhost:5001/api/tutors/me",
          "GET",
          null,
          token
        );
        setFormData({
          name: res.name,
          qualifications: res.qualifications,
          subjects: res.subjects.join(", "),
          hourlyRate: res.hourlyRate,
          preferences: res.preferences,
        });
        setStatus(res.isVerified ? "Verified" : "Not Verified");
      } catch (err) {
        console.error("Failed to load tutor profile:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = {
        ...formData,
        subjects: formData.subjects.split(",").map((s) => s.trim()),
      };
      await apiRequest(
        "http://localhost:5001/api/tutors/me",
        "PUT",
        updated,
        token
      );
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update tutor profile:", err.message);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tutor Profile</h2>
      <div className="mb-4"></div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Qualifications</label>
          <input
            type="text"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">
            Subjects (comma separated)
          </label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Hourly Rate ($)</label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Preferences</label>
          <select
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
            <option value="both">Both</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default TutorProfile;
