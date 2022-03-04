import { NextPage } from "next";
import Form from "../components/Form";

const Home: NextPage = () => {
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
          <Form />
        </div>
      </div>
      <div className="grid place-content-center gap-12 h-screen snap-start">
        <div
          className="
          w-[75vw]
          h-[75vw]
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
              //TODO
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
