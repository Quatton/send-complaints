export default function Form({ data }) {
  return (
    <div
      className="
      w-[50vh]
      h-[50vh]
      md:w-[32rem]
      md:h-[32rem]
      landscape:w-[75vw]
      landscape:h-[75vh]
      grid
      gap-6
      place-items-center
      p-3
      text-gray-300
      bg-gray-800
      rounded-xl
      shadow-xl
      overflow-y-auto
      landscape:overflow-x-auto
      snap-mandatory
      scrollbar-track-transparent
      scrollbar-thumb-transparent
      text-center
    "
    >
      {data.map((card) => {
        return (
          <div
            key={card.id}
            className="flex flex-col 
          w-[16em]
          h-[16em] 
          bg-gray-400/0
          shadow-md
          snap-center
      "
          >
            <div className="font-medium text-md sm:text-2xl landscape:text-[1em] w-full bg-gray-900 rounded-t-xl p-2 py-6 landscape:py-2">
              <h1>{card.title}</h1>
            </div>

            <div className="justify-center text-sm sm:text-lg landscape:text-[0.75em] flex h-full items-center w-full bg-gray-700 rounded-b-xl p-2">
              <p>{card.desc}</p>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
}
