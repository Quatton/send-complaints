import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <h1
        className="
        text-3xl 
        font-bold
      "
      >
        First Post
      </h1>
      <Link href="/">
        <a
          className="
          text-3xl 
          font-bold
          text-blue-400 
          hover:text-violet-600 
            hover:underline
          active:text-violet-700
        "
        >
          Back to home
        </a>
      </Link>
    </>
  );
}
