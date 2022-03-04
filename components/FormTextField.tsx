type SizeProp = {
  width: Number;
  height: Number;
};

export default function FormTextField({ width, height }: SizeProp) {
  return (
    <textarea
      id="complain"
      placeholder="Feel free to express your opinion!"
      className={`
          resize-none w-[${width}] md:w-[50vw] h-[${height}ch] py-2
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
