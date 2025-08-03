import { useRef, useState } from "react";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!username || !password) {
      alert("Username and password are required!");
      return;
    }

    try {
      setLoading(true);
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        userName: username,
        password,
      });
      navigate("/signin")
    } catch (error: unknown) {
      console.error(error);
      alert(error || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg border border-gray-200 shadow-md w-80 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-2">
          Sign Up
        </h2>

        <Input ref={usernameRef} placeholder="Username" type="text" />
        <Input ref={passwordRef} placeholder="Password" type="password" />

        <div className="flex justify-center mt-2">
          <Button
            onClick={signup}
            variant="primary"
            text={loading ? "Signing Up..." : "Sign Up"}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};
