import { Header } from "@/modules/header/Header";
import { Hero } from "@/modules/hero/Hero";

export default function Home() {
  return (
    <div className="py-25">
      <Header />
      <Hero />
    </div>
  );
}