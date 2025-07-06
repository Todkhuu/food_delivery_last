import { Categories } from "../(main)/_components/Categories";
import { Foods } from "../(main)/_components/Foods";
import { Footer } from "../(main)/_components/Footer";
import { Header } from "../(main)/_components/Header";

export const dynamic = "force-dynamic";

export default function MainHome() {
  return (
    <div className="bg-[#404040]">
      <Header />
      <Categories />
      <Foods />
      <Footer />
    </div>
  );
}
