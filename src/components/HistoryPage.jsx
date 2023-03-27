import { useEffect, useState } from 'react';

function HistoryPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('logs')) || [];
    setLogs(storedLogs);
  }, []);

  return (
    <div className="flex items-center p-10">
    <div class="p-1 m-2 w-full p-6 w-[19.875rem] rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
          <div class="flex items-center p-4 pb-0">
          <div class="ml-4 flex-auto">
          {logs.map((logEntry) => (
            <li key={logEntry.time} class="text-lg flex justify-center" id="history-list" style={{ display: 'block' }}>
            {logEntry.time}: {logEntry.event}
            </li>
        ))}
          </div>
          </div>
      </div>
      </div>
  );
}

export default HistoryPage;


{/* <div class="bg-white rounded-lg shadow lg:w-1/3">
    <ul class="divide-y divide-gray-100">
        <li >
            List Item 1
        </li>
        <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
            List Item 2
        </li>
        <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
            List Item 3
        </li>
        <li class="p-3 hover:bg-blue-600 hover:text-blue-200">
            List Item 4
        </li>
    </ul>
</div>  */}