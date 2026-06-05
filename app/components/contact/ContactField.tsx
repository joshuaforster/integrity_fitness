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
    <div>
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
        {label}
        {required && <span className="text-[#CE1A19] ml-0.5">*</span>}
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
        className="w-full bg-white border border-zinc-200 focus:border-[#CE1A19] rounded-lg px-4 py-3 text-zinc-950 text-sm placeholder:text-zinc-400 outline-none transition-colors duration-200"
      />
    </div>
  );
}
