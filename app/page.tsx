import { Button } from "@/components/ui/button";
import { Divide, Dot } from "lucide-react";
import Image from "next/image";
import Banner from "@/components/home/Banner";
import BgGradient from "@/components/Common/Bg-Gradient";
import HowItworks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="mx-auto w-full inset-0 h-full bg-[radial-gradient (#e5e7eb_1px), transparent_1px)]
    [background-size: 16px 16px] ">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <BgGradient />
      <Banner/>
      <div className="flex items-center justify-center">
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
      </div>
      <HowItworks/>
      <div className="flex items-center justify-center">
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
      </div>
      <Pricing/>
      <div className="flex items-center justify-center">
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
        <Dot className="text-purple-400"></Dot>
      </div>
      <footer className="bg-gray-200/20 flex h-20 py-24 px-12 z-20 relative overflow-hidden flex-col gap-2"><p>All Rights Reserved, {new Date().getFullYear()}</p><a href='/'>Build by @Dhananjay Rana</a></footer>
    </main>
  );
}
