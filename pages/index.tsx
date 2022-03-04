import type { NextPage } from "next";
import Form from "../components/Form";

const Home: NextPage = () => {
  const options = ["Complain", "Suggestion"];
  const width = 45;
  const height = 20;
  return (
    <div className="grid place-content-center gap-12 h-screen bg-gray-900">
      <div className="container text-center ">
        <h1 className="text-5xl font-bold bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">
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
      "
      >
        <Form options={options} width={width} height={height} />
      </div>
    </div>
  );
};
export default Home;
