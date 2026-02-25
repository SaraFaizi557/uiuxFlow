import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="bg-white">
      <h1 className="font-dm-sans text-2xl font-bold">Hello World</h1>
      <UserButton />
    </div>
  );
}
