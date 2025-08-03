import { useRef, useState } from "react";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  async function signin() {
    const username = usernameRef.current?.value.trim();
    const password = passwordRef.current?.value.trim();

    if (!username || !password) {
      alert("Username and password are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        userName: username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || "Sign-in failed. Try again.");
      } else {
        alert("Unexpected error occurred.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg border border-gray-200 shadow-md w-80 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-2">
          Sign In
        </h2>

        <Input ref={usernameRef} placeholder="Username" type="text" />
        <Input ref={passwordRef} placeholder="Password" type="password" />

        <div className="flex justify-center mt-2">
          <Button
            onClick={signin}
            variant="primary"
            text={loading ? "Signing In..." : "Sign In"}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};
