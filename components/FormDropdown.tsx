type OptionProps = {
  options: Array<String>;
};

export default function FormDropdown({ options }: OptionProps) {
  return (
    <select
      name="complain-type"
      id="complain-type"
      className="
        py-2
        focus:ring-indigo-500 
        focus:border-indigo-500 
        flex-1 block font-medium
        rounded-md 
        sm:text-sm 
        shadow-md
      border-gray-800
      bg-gray-700
      "
      required
    >
      {options.map((item) => (
        <option value={item.toLowerCase()}>{item}</option>
      ))}
    </select>
  );
}
