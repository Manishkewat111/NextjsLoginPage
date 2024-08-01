"use client";
import { AuthService } from "@/service";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const authService = AuthService.getInstance();

  const fetchUser = async () => {
    try {
      const user = await authService.getAccount();
      console.log(user);
      setUser(user || null);
    } catch (err: any) {
      setUser(null);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <nav className="w-full flex justify-between items-center py-4 bg-black">
      <Link href={"/"} className="text-xl font-bold text-white ml-16 ">
        NextJs Appwrite CRUD
      </Link>
      <ul className="flex justify-end items-center pr-16 space-x-8">
        {user ? (
          <>
            <li>
              <p className="text-white ">
                Welcome <span className="font-bold">{user.name} </span>
              </p>
            </li>
            <li>
              <Link
                href={"/"}
                className="bg-blue-500 hover:bg-blu-700 text-white py-2 px-4 rounded focus:outline-none"
              >
                Add User
              </Link>
            </li>
            <li>
              <button
                onClick={() =>
                  authService
                    .logout()
                    .then(() => {
                      setUser(null);
                      toast.success("Logout success!!");
                    })
                    .catch((err: any) => {
                      toast.error(err.message);
                    })
                }
                className="text-slate-400 hover:text-white"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"} className="text-slate-400 hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link
                href={"/register"}
                className="text-slate-400 hover:text-white"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
