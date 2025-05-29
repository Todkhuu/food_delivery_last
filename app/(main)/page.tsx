import { Categories } from "./_components/Categories";
import { Foods } from "./_components/Foods";
import { Header } from "./_components/Header";

export default function MainHome() {
  return (
    <div>
      <Header />
      <Categories />
      <Foods />
    </div>
  );
}
