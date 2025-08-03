import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}> (({ onChange, placeholder, type = "text" }, ref) => {
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      type={type}
      className="px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
      onChange={onChange}
    />
  );
});
