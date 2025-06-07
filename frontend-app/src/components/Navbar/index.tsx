import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from '@/utils/cn'; // ถ้ามี helper รวม class

const navItems = [
{ label: 'หน้าหลัก', path: '/' },
{ label: 'Seller', path: '/seller' },
{ label: 'Feedback', path: '/feedback' },
];
const Navbar = () => {

  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md sticky top-0 ">
      <div className="mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}    
        <Link to="/" className="text-xl font-bold text-blue-600">BlackMarket</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={cn(
                  "hover:text-blue-600",
                  location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
          {navItems.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-2 px-2 rounded hover:bg-blue-100",
                  location.pathname === path ? "bg-blue-100 text-blue-600" : "text-gray-700"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};



export default Navbar;