import { UserButton } from "@clerk/nextjs";
import Header from "./_shared/Header";
import Hero from "./_shared/Hero";

export default function Home() {
  return (
    <div className="bg-white font-dm-sans">
      <Header />
      <Hero />
    </div>
  );
}
