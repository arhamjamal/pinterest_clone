function AuthInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = true,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-[#252525]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-[#E8E1DA] bg-[#FFFDF9] px-4 py-3 text-sm text-[#252525] outline-none transition duration-200 placeholder:text-[#77706A] hover:border-[#D8C9BF] focus:border-[#D94A5A] focus:bg-white focus:ring-4 focus:ring-[#D94A5A]/10"
      />
    </div>
  );
}

export default AuthInput;