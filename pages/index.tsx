import { AppProps } from "next/app";
import { PropsWithChildren } from "react";
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

const PageBG = (): PropsWithChildren => {
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
    ></div>
  );
};

export default function Home({ optionData, boardData }: Data) {
  return (
    <PageBG>
      <div
        id="send-complaints"
        className="relative grid place-content-center gap-12 landscape:gap-3 h-screen max-w-5 snap-start"
      >
        <div className="container">
          <h1 className="text-center p-2 landscape:text-3xl text-5xl sm:text-6xl font-bold bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            send-complaints
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
        <Link href="#voting-page">
          <a
            className="text-sm font-light text-white text-center absolute animate-pulse bg-gradient-to-b
      from-white/0
      to-white/10 bottom-0 w-full h-[6rem] landscape:h-[4rem]"
          >
            <span className="relative top-1/2 translate-y-1/2 landscape:top-1/4">
              To voting-page!
              <i className="absolute -bottom-3 right-1/2 arrow rotate-[45deg]"></i>
            </span>
          </a>
        </Link>
      </div>
      <div
        id="voting-page"
        className="overflow-y-hidden text-md relative grid place-content-center gap-6 landscape:gap-1 h-screen max-w-5 snap-start"
      >
        <Link href="#send-complaints">
          <a
            className="text-sm font-light text-white text-center absolute animate-pulse bg-gradient-to-t
      from-white/0
      to-white/10 top-0 w-full h-[6rem] landscape:h-[4rem] "
          >
            <span className="relative top-1/4 -translate-y-1/2">
              <i className=" absolute -top-2 right-1/2 arrow rotate-[-135deg]"></i>
              To send-complaints!
            </span>
          </a>
        </Link>

        <div className="container">
          <h1 className="text-center landscape:text-3xl p-2 text-3xl sm:text-6xl font-bold bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            voting-page
          </h1>
          <VotingBoard data={boardData} />
        </div>
      </div>
    </PageBG>
  );
}

export async function getServerSideProps() {
  let board_json;
  try {
    const res = await fetch("https://send-complain.vercel.app/api/complaints");
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
