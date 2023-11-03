import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));

    if (!session?.accessToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <header className="py-6 bg-slate-100">
        <Link className="flex items-center px-4" to={`/`}>
          <img
            className="block w-12 h-12 mr-4"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          <p className="inline-block font-bold text-slate-600">FieldAPP</p>
        </Link>
      </header>
      <main className="container m-6 mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
