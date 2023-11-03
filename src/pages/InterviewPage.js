import { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';
import { Link, useNavigate } from 'react-router-dom';

export default function InterviewPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { getAll } = useIndexedDB('interviews');

  useEffect(() => {
    getAll().then((value) => {
      setData(value);
    });
  }, [getAll]);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-slate-600">Interviews</h1>
        <Link
          className="px-3 py-2 text-base uppercase rounded text-slate-600 hover:bg-slate-500 hover:text-slate-100 bg-slate-300"
          to={`/interviews/add-new`}
        >
          Add New
        </Link>
      </div>
      <div className="relative my-6 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Loan Info
              </th>
              <th scope="col" className="px-6 py-3">
                Client Info
              </th>
              <th scope="col" className="px-6 py-3">
                Personal Detail
              </th>
              <th scope="col" className="px-6 py-3">
                Household Detail
              </th>
              <th scope="col" className="px-6 py-3">
                Business Profile
              </th>
              <th scope="col" className="px-6 py-3">
                Approval Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((i) => (
                <tr
                  key={i.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i.id}
                  </th>
                  <td className="px-6 py-4">{JSON.stringify(i.loanInfo)}</td>
                  <td className="px-6 py-4">{JSON.stringify(i.clientInfo)}</td>
                  <td className="px-6 py-4">
                    {JSON.stringify(i.personalDetail)}
                  </td>
                  <td className="px-6 py-4">
                    {JSON.stringify(i.householdDetail)}
                  </td>
                  <td className="px-6 py-4">
                    {JSON.stringify(i.businessProfile)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full text-slate-100 bg-slate-400 whitespace-nowrap">
                      {i.approvalStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {i.approvalStatus === 'changed-requested' ? (
                      <Link
                        className="px-2 py-1 text-sm uppercase rounded text-slate-600 hover:bg-slate-500 hover:text-slate-100 bg-slate-300"
                        to={`/interviews/${i.id}/edit`}
                      >
                        Edit
                      </Link>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
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
