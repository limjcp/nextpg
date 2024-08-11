"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ChangePassword() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("You must be logged in to change your password.");
      return;
    }

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        userId: session.user.id,
      }),
    });

    if (res.ok) {
      alert("Password changed successfully");
      setFormData({
        oldPassword: "",
        newPassword: "",
      });
    } else {
      alert("Error changing password");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldPassword">Old Password:</label>
        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
