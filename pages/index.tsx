import { AppProps } from "next/app";
import Form from "../components/Form";
import VotingBoard from "../components/VotingBoard";
import Link from "next/link";
import styles from "../styles/Home.module.css";

interface CardData {
  title: string;
  desc: string;
  votes: number;
  about: string;
  status: string;
}
interface Data extends AppProps {
  optionData: Object;
  boardData: Array<CardData>;
}
export default function Home({ optionData, boardData }: Data) {
  return (
    <div
      className="
      bg-gradient-to-b
      from-gray-900
      to-indigo-900
      h-[100vh]
      overflow-y-scroll
      scroll-smooth
      snap-mandatory
      snap-y
    "
    >
      <div
        id="up"
        className="relative grid place-content-center gap-12 h-screen max-w-5 snap-start"
      >
        <div className="container">
          <h1 className="text-center p-2 text-5xl sm:text-6xl font-bold bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">
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
          <Form data={optionData} />
        </div>
        <Link href="#down">
          <a
            className="text-md font-light text-white text-center absolute animate-pulse bg-gradient-to-b
      from-white/0
      to-white/10 bottom-0 w-full h-[8rem]"
          >
            <span className="relative top-1/2 translate-y-1/2">
              To voting-page!
              <i className="absolute -bottom-3 left-1/2  arrow down"></i>
            </span>
          </a>
        </Link>
      </div>
      <div
        id="down"
        className="text-md relative grid place-content-center gap-6 h-screen max-w-5 snap-start"
      >
        <Link href="#up">
          <a
            className="font-light text-white text-center absolute animate-pulse bg-gradient-to-t
      from-white/0
      to-white/10 top-0 w-full h-[8rem]"
          >
            <span className="relative top-1/4 -translate-y-1/2">
              <i className="absolute -top-2 right-1/2 arrow up"></i>
              To send-complain!
            </span>
          </a>
        </Link>

        <div className="container">
          <h1 className=" text-center p-2 text-3xl sm:text-6xl font-bold bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            voting-page
          </h1>
        </div>
        <div
          className="
          w-[32rem]
          h-[32rem]
          md:w-[32rem]
          md:h-[32rem]
          grid
          gap-6
          place-items-center
          p-3
          text-gray-300
          bg-gray-800
          rounded-xl
          shadow-xl
          overflow-y-auto
          snap-mandatory
          scrollbar-track-transparent
          scrollbar-thumb-transparent
          text-center
        "
        >
          <VotingBoard data={boardData} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let board_json;
  try {
    const res = await fetch("https://send-complain.vercel.app/api/complaint");
    board_json = await res.json();
  } catch {
    console.error("error fetching board");
  }

  const boardData = board_json
    ? board_json
    : [
        {
          id: 0,
          title: "Nothing here!",
          desc: "Nothing has been added to the voting page yet, or error fetching data",
          votes: 0,
          about: "Feature",
          status: "NotFound",
        },
      ];

  let option_json;
  try {
    const res = await fetch("https://send-complain.vercel.app/api/option");
    option_json = await res.json();
  } catch {
    console.error("error fetching options, using default settings");
  }

  const optionData = option_json
    ? {
        type_options: Object.keys(option_json.type_options),
        about_options: Object.keys(option_json.about_options),
      }
    : {
        type_options: ["Complain", "Suggest"],
        about_options: ["Feature", "Bug", "Graphics", "Performance"],
      };

  return {
    props: { optionData, boardData },
  };
}
