'use client'
import Header from "components/layout/Header";
import ArticlesCards from "components/home/maincard/ArticlesCards";
import Sidebar from "components/home/Sidebar";
import Tags from "components/home/Tags";

export default function Home() {

  return (
    <div className="main-container">
      <Header />
      <main className="min-h-[calc(100vh-100px)] mt-[63px]">
        <div className="grid grid-cols-4">
          <div className="sm:col-span-3 px-6 border-r-2 border-t-2 border-[#F2F2F2]">
            <div className="border-b-2 border-gray-200">
              <Tags />
            </div>
            <ArticlesCards />
          </div>
          <div className="sm:col-span-1 px-6 bg-white min-h-screen">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
