import { Navbar, Footer } from "@/components";
import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8 flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;