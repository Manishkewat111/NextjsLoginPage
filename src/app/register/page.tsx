"use client";
import { Form } from "@/components";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AuthService } from "@/service";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const { email, password, userId, name } = data;

    if (!email || !password || !userId || !name) {
      toast.error("Please Fill all fields");
      return;
    }
    const authService = AuthService.getInstance();
    const userData = {
      email,
      password,
      userId,
      name,
    };
    setLoading(true);
    authService
      .register(userData)
      .then((res: any) => {
        console.log(res);
        setLoading(false);
        toast.success("Registeration Successful!");

        router.push("/login");
      })
      .catch((err: any) => {
        // console.log(err.message);
        toast.error(err.message);
        setLoading(false);
      });

    // alert(JSON.stringify(data));
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-7xl mt-16 text-center font-bold text-gray-900">
        Register Page
      </h1>
      <Form
        loading={loading}
        onSubmit={handleSubmit}
        fields={[
          {
            name: "userId",
            label: "Username",
            type: "text",
            placeholder: "Enter your Username",
          },
          {
            name: "name",
            label: "Full Name",
            type: "text",
            placeholder: "Enter your full Name",
          },
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
        btnTitle="Register"
      />
    </div>
  );
};

export default RegisterPage;
