import JSZip from 'jszip';
import { useIndexedDB } from 'react-indexed-db-hook';
import { Link } from 'react-router-dom';
import Axios from '../network/axios';

export default function HomePage() {
  const {
    clear: clearClients,
    add: addClient,
    getAll: getClients,
  } = useIndexedDB('clients');
  const {
    clear: clearInterviews,
    add: addInterview,
    getAll: getInterviews,
  } = useIndexedDB('interviews');

  const handleDownload = async () => {
    await clearClients();
    await clearInterviews();

    const res = await Axios.get('download');
    const { clients, interviews } = res.data.data;

    clients.forEach((c) => {
      addClient(c);
    });
    interviews.forEach((i) => {
      addInterview(i);
    });
  };

  const handleUpload = async () => {
    const clients = await getClients();
    const interviews = await getInterviews();

    const data = {
      clients,
      interviews,
    };

    const jsonBlob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });

    const zip = new JSZip();

    zip.file('data.json', jsonBlob);

    const content = await zip.generateAsync({ type: 'blob' });
    const file = new File([content], 'data.json', { type: content.type });
    const form = new FormData();
    form.append('zip', file);
    Axios.post('/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <section className="flex justify-evenly">
      <Link to={`/interviews`}>
        <div className="flex items-center content-center justify-center border-2 rounded-lg w-28 h-28 hover:bg-slate-400 hover:text-slate-100 bg-slate-300 border-slate-400">
          Interviews
        </div>
      </Link>
      <Link to={`/clients`}>
        <div className="flex items-center content-center justify-center border-2 rounded-lg w-28 h-28 hover:bg-slate-400 hover:text-slate-100 bg-slate-300 border-slate-400">
          Clients
        </div>
      </Link>
      <button
        onClick={handleDownload}
        className="flex items-center content-center justify-center border-2 rounded-lg w-28 h-28 hover:bg-slate-400 hover:text-slate-100 bg-slate-300 border-slate-400"
      >
        Download
      </button>
      <button
        onClick={handleUpload}
        className="flex items-center content-center justify-center border-2 rounded-lg w-28 h-28 hover:bg-slate-400 hover:text-slate-100 bg-slate-300 border-slate-400"
      >
        Upload
      </button>
    </section>
  );
}
