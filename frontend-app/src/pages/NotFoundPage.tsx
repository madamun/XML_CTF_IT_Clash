import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
  return (
    <div className="text-center mt-32" role="alert" aria-label="Page not found">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-500">คุณพิมพ์ URL ผิดหรือหน้านี้ไม่มีอยู่ในระบบ</p>
      <Link to="/" className="text-blue-500 underline mt-4 block">
        ← กลับหน้าหลัก
      </Link>
    </div>
  );
};

export default NotFoundPage;
