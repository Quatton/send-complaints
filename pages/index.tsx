import Form from "../components/Form";

export default function Home({ data }) {
  return (
    <div
      className="
      bg-gradient-to-b
      from-gray-900
      to-indigo-900
      h-[100vh]
      overflow-y-scroll
      snap-mandatory
      snap-y
    "
    >
      <div className="grid place-content-center gap-12 h-screen max-w-5 snap-start">
        <div className="container">
          <h1 className="text-center text-6xl font-bold bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            send-complain
          </h1>
        </div>
        <div
          className="
          grid
          p-3
          text-gray-300
          bg-gray-800
          rounded-xl
          shadow-xl
        "
        >
          <Form data={data} />
        </div>
      </div>
      <div className="grid place-content-center gap-12 h-screen snap-start">
        <div
          className="
          w-[75vh]
          h-[75vh]
          md:w-[32rem]
          md:h-[32rem]
          grid
          place-content-center
          p-3
          text-gray-300
          bg-gray-800
          rounded-xl
          shadow-xl
        "
        >
          <div className="container">
            <h1 className="text-center text-5xl font-bold bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              {"//"}TODO
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const data = {};
  try {
    const res = await fetch("https://send-complain.vercel.app/api/complaints", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return {
      props: { data },
    };
  } catch (e) {
    const type_options = ["Complain", "Suggest"];
    const about_options = ["Features", "Bugs", "Graphics", "Performance"];
    const data = { type_options: type_options, about_options: about_options };

    return {
      props: { data },
    };
  }
}
