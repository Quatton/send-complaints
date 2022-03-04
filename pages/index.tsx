import type { NextPage } from "next";
import Form from "../components/Form";

const Home: NextPage = () => {
  return (
    <div className="grid place-items-center h-screen bg-black">
      <div
        className="
        grid
        place-items-center
        p-3
        text-gray-900
        bg-slate-300
        rounded-xl
      "
      >
        <Form />
      </div>
    </div>
  );
};
export default Home;
