"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import { useState } from "react";
import LoadingSpinner from "./loadingSpiner";
interface IField {
  fields: any[];
  btnTitle: string;
  onSubmit: (e: any) => void;
  loading: boolean;
}

const form: FC<IField> = ({ fields, btnTitle, onSubmit, loading }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();

  const [data, setData] = useState<any>(
    fields
      ? fields.reduce((acc: any, field: any) => {
          acc[field.name] = "";
          return acc;
        }, {})
      : {}
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit} className="mx-auto w-96">
      {/* {JSON.stringify(data)} */}
      {fields.map((field: any, index: number) => (
        <div key={index} className="my-4 flex flex-col gap-2">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={data[field.name]}
            onChange={(e) => setData({ ...data, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            className="border border-gray-300 py-2 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      ))}
      {["/login", "/register"].includes(pathname) && (
        <p className="text-end w-full text-sm text-slate-900 font-light italic">
          {pathname === "/login" ? (
            <>
              Not a Member ?
              <Link href="/register" className="text-blue-500">
                Register
              </Link>
            </>
          ) : (
            <>
              Already a Member ?
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </>
          )}
        </p>
      )}

      <button
        type="submit"
        className="bg-black flex items-center gap-2  mt-5  mx-auto w-full text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        {loading && <LoadingSpinner />}
        {btnTitle}
      </button>
    </form>
  );
};

export default form;
