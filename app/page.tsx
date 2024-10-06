import { Button } from "@/components/ui/button";
import { Divide, Dot } from "lucide-react";
import Image from "next/image";
import Banner from "@/components/ui/Home/Banner";
import BgGradient from "@/components/Common/Bg-Gradient";
import HowItworks from "@/components/ui/Home/HowItWorks";

export default function Home() {
  return (
    <main className="mx-auto w-full inset-0 h-full bg-[radial-gradient (#e5e7eb_1px), transparent_1px)]
    [background-size: 16px 16px] ">
      <BgGradient />
      <Banner/>
      <div className="flex items-center justify-center">
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
      </div>
      <HowItworks/>
      {/* <Divider/>
      <Pricing/>
      <Divider/>
      <Footer/> */}
    </main>
  );
}
