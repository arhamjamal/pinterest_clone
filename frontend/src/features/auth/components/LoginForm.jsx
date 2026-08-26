import { useState } from "react";
import AuthInput from "./AuthInput";
import useAuth from "../hooks/useAuth";

function LoginForm() {
  const { login, loading, error } = useAuth();

  const [formData, setFormData] = useState({
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
      await login(formData);
    } catch {
      // Error is already stored in useAuth.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

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
        placeholder="Enter your password"
      />

      {error && <p>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;