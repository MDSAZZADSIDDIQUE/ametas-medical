import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import IconSections from "@/components/IconSections/IconSections";
import Welcome from "@/components/Welcome/Welcome";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IconSections />
        <Welcome />
      </main>
      <Footer />
    </>
  );
}
