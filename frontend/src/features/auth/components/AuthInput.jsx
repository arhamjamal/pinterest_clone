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
    <div>
      <label htmlFor={name}>{label}</label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default AuthInput;