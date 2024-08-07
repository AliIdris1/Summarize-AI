import Image from "next/image";
import Hero from "./components/Hero";
import Demo from "./components/Demo";

export default function Home() {
  return (
    <main>
      <div className="w-full min-h-full fixed flex justify-center pointer-events-none py-6 pl-[120px] pr-[160px]">
        <div className="gradient"/>
        </div>

        <div className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
          <Hero />
          <Demo />        
        </div>
    </main>
  );
}
