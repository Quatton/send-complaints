type OptionProps = {
  options: Array<string>;
  name: string;
  side: string;
};

export default function FormDropdown({ options, name, side }: OptionProps) {
  return (
    <div className="container">
      <select
        name={name}
        id={name}
        className={`
        md:w-[40%]
        py-2
        focus:ring-indigo-500 
        focus:border-indigo-500 
        flex-1 font-medium
        rounded-${side}md 
        w-full
        md:w-full
        sm:text-sm 
        shadow-md
      border-gray-800
      bg-gray-700
      `}
        required
      >
        {options.map((item) => (
          <option value={item.toLowerCase()}>{item}</option>
        ))}
      </select>
    </div>
  );
}
