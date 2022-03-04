export default function FormTextField() {
  return (
    <textarea
      id="complain"
      name="complain"
      placeholder="Feel free to express your opinion!"
      className={`
          resize-none w-[45ch] md:w-[50vw] md:max-w-lg md:h-[30ch] py-2
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
