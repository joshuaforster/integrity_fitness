"use client";

interface ContactFieldProps {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  label: string;
}

export default function ContactField({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  label,
}: ContactFieldProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...(autoComplete ? { autoComplete } : {})}
        className="w-full bg-transparent border-b border-zinc-200 focus:border-zinc-950 py-3 text-zinc-950 text-sm placeholder:text-zinc-400 outline-none transition-colors duration-200"
      />
    </div>
  );
}
