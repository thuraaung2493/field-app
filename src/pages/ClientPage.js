import { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';
import { Link, useNavigate } from 'react-router-dom';

export default function ClientPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { getAll } = useIndexedDB('clients');

  useEffect(() => {
    getAll().then((value) => {
      setData(value);
    });
  }, [getAll]);

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-600">Clients</h1>
      <div className="relative my-6 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                NRC Number
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((c) => (
                <tr
                  key={c.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {c.id}
                  </th>
                  <td className="px-6 py-4">{c.name}</td>
                  <td className="px-6 py-4">{c.phone}</td>
                  <td className="px-6 py-4">{c.nrc}</td>
                  <td className="px-6 py-4">{c.address}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Link
        className="px-4 py-3 text-base uppercase rounded text-slate-600 hover:bg-slate-500 hover:text-slate-100 bg-slate-300"
        onClick={() => navigate(-1)}
      >
        Back
      </Link>
    </>
  );
}
