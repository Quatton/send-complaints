export default function FormTitle() {
  return (
    <input
      type="text"
      name="title"
      id="title"
      placeholder="Title"
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
    />
  );
}
