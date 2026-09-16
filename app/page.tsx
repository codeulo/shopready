import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Audit from "@/components/Audit";
import Pricing from "@/components/pricing/Pricing";
import Audience from "@/components/Audience";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Features />
        <Audit />
        <Pricing />
        <Audience />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
