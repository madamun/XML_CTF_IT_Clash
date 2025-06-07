  const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10 w-full">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 ">
            
            {/* Branding */}
            <div>
              <h2 className="text-xl font-bold">BlackMarket</h2>
              <p className="text-sm text-gray-400 mt-2">
                ให้บริการอย่างจริงใจ เพื่ออนาคตที่ดีกว่า
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="font-semibold mb-2">ลิงก์ที่น่าสนใจ</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li><a href="/about" className="hover:underline">เกี่ยวกับเรา</a></li>
                <li><a href="/contact" className="hover:underline">ติดต่อเรา</a></li>
                <li><a href="/privacy" className="hover:underline">นโยบายความเป็นส่วนตัว</a></li>
                <li><a href="/terms" className="hover:underline">เงื่อนไขการใช้งาน</a></li>
              </ul>
            </div>

            {/* Contact or Social */}
            <div>
              <h3 className="font-semibold mb-2">ติดต่อเรา</h3>
              <p className="text-sm text-gray-300">อีเมล: info@ghotmail.com</p>
              <p className="text-sm text-gray-300">โทร: 02-123-4567</p>
              <div className="flex gap-4 mt-3">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400">Instagram</a>
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm mt-8">
            © {new Date().getFullYear()} MyWebsite. All rights reserved.
          </div>
      </footer>
    )
  };

  export default Footer;