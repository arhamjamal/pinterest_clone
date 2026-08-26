import { useState } from "react";
import AuthInput from "./AuthInput";
import useAuth from "../hooks/useAuth";

function SignupForm() {
  const { signup, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signup(formData);
    } catch {
      // Error is already stored in useAuth.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

      <AuthInput
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter your username"
      />

      <AuthInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />

      <AuthInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}

export default SignupForm;