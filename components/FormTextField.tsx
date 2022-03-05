export default function FormTextField() {
  return (
    <textarea
      id="complain"
      name="desc"
      placeholder="Feel free to express your opinion!"
      className={`
          resize-none w-full md:max-w-lg h-[20ch] landscape:h-[10ch] py-2
          focus:ring-indigo-500 
          focus:border-indigo-500 
          block 
          rounded-md
          sm:text-sm 
          border-gray-800
          bg-gray-700
          shadow-md
          placeholder:italic placeholder:text-slate-400
        `}
      required
    />
  );
}
