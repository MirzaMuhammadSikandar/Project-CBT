import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/Button";
const ForgotPassword = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(resetEmail);
      const response = await axios.post(
        "http://localhost:3000/user/forgetpassword",
        { email: resetEmail }
      );

      console.log(response.data);
      setResetToken(response.data.token);
      alert("Reset password email sent successfully");
    } catch (error) {
      alert("Service Error");
      console.error(error);
    }
  };

  if (resetToken) {
    navigate(`/reset-password?token=${resetToken}`);
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <input
            type="email"
            placeholder="Please Enter Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="pl-5 pr-3 py-2 w-80 border-2 rounded-md focus:outline-none focus:border-blue-500 max-sm:mt-48 md:mt-48 sm:mt-48"
          />
        </div>
        <div className="text-center mt-6">
          <Button type="submit">Send Email</Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
