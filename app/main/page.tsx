import { Banner } from "./_components/Banner";
import { Categories } from "./_components/Categories";
import { Foods } from "./_components/Foods";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

export default function MainHome() {
  return (
    <div className="bg-[#404040]">
      <Header />
      <Banner />
      <Categories />
      <Foods />
      <Footer />
    </div>
  );
}
