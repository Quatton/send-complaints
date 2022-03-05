type ButtonProps = {
  text: String;
};

export default function Button({ text }: ButtonProps) {
  return (
    <button
      type="submit"
      className="
        w-fit
        px-4
        py-2
        bg-gradient-to-br
        from-sky-400
        to-indigo-400
        transition-colors
        hover:from-indigo-400
        hover:to-sky-400
        active:from-indigo-400
        activer:to-sky-400
        ease-in-out
        duration-1000
        inline-flex justify-center 
        border border-transparent 
        text-lg font-medium rounded-md 
        text-white 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-1 
        focus:ring-indigo-500
        shadow-md
      "
    >
      {text}
    </button>
  );
}
