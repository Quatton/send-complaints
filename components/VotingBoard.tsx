export default function Form({ data }) {
  return data.map((card) => {
    return (
      <div
        key={card.id}
        className="flex flex-col 
         w-[24rem]
          h-[24rem] bg-gray-400/0
            shadow-md
            snap-center
            "
      >
        <div className="font-medium text-md sm:text-2xl w-full bg-gray-900 rounded-t-xl p-2 py-6">
          <h1>{card.title}</h1>
        </div>

        <div className="justify-center text-sm sm:text-lg flex h-full items-center w-full bg-gray-700 rounded-b-xl p-2">
          <p>{card.desc}</p>
        </div>
      </div>
    );
  });
}
