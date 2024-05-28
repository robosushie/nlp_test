import BotsList from "@/components/bots_list";
import { Montserrat, Poppins, Inter, Lato } from "next/font/google";

const banner_font = Inter({ subsets: ["latin"], weight: "500" });
const content_font = Inter({ subsets: ["latin"], weight: "300" });
const title_font = Poppins({ subsets: ["latin"], weight: "500" });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-neutral-100">
      <div className="w-full h-screen flex flex-col">
        <div
          className={`${banner_font.className} bg-blue-100 py-4 flex justify-center text-blue-600`}
        >
          This is a demo website for developing and testing the platform
        </div>
        <div
          className={`${title_font.className} w-full text-xl py-3 px-8 border-b-[1px] bg-white border-neutral-300`}
        >
          Natural Language Conversation Bot Platform
        </div>
        <div className="w-full h-full flex">
          <div
            className={`${content_font.className} px-8 py-6 text-sm w-1/5 h-full bg-white border-r-[1px] border-neutral-300`}
          >
            The Natural Language Bot Platform allows us to create custom
            AI-powered bots. We can create personalized bots, upload relevant
            files, and interact through both text and voice.
          </div>
          <div className="grow h-full bg-neutral-100">
            <BotsList />
          </div>
        </div>
      </div>
    </main>
  );
}
