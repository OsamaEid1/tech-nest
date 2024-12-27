import { TAGS, MAIN_TAGS } from "app/helpers/constants";
import Header from "components/layout/Header";
import MainCard from "components/home/maincard/MainCard";
import Sidebar from "components/home/Sidebar";
import Tags from "components/home/Tags";

export default function Home({children}) {
  
  return (
    <div className="main-container">
      <Header />
      <main className="min-h-[calc(100vh-100px)] mt-[63px]">
        <div className="grid grid-cols-3">
          <div className="sm:col-span-2 col-span-3 px-6 border-r-2 border-t-2 border-[#F2F2F2]">
            <div className="border-b-2 border-gray-200">
              <Tags />
            </div>

            {children ? (children) : (<MainCard />)}
          </div>
          <div className="sm:col-span-1 px-6">
            <Sidebar />
          </div>
        </div>
      </main>
      <footer className="text-center ">All Copyrights Are Reserved 2024</footer>
    </div>
  );
}
