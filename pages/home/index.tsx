import Head from "next/head";
import Timer from "./Timer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Timer</title>
      </Head>
      <main>
        <Timer />
      </main>
    </div>
  );
}
