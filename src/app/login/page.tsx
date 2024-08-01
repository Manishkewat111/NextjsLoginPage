"use client";
import { Form } from "@/components";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthService } from "@/service";
const LoginPage = () => {
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please Fill all fields");
      return;
    }
    const authService = AuthService.getInstance();
    setLoading(true);
    authService
      .login(email, password)
      .then((res: any) => {
        toast.success("Login successful!");
        console.log(res);
        setLoading(false);
        router.push("/");
      })
      .catch((err: any) => {
        if (err.message.includes("Invalid credentials")) {
          toast.error("Invalid credentials!");
        }
        setLoading(false);
      });

    // alert(JSON.stringify(data));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-7xl mt-16 text-center font-bold text-gray-900">
        Login Page
      </h1>
      <Form
        loading={loading}
        onSubmit={handleSubmit}
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
          },
        ]}
        btnTitle="Login"
      />
    </div>
  );
};

export default LoginPage;
