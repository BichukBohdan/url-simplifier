import {Link} from "react-router-dom";

export default function LinksList({links}) {
  if (!links.length) {
    return <p className="center">Links list is empty</p>
  }

  return (
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                №
              </th>
              <th scope="col" className="px-6 py-3">
                Original URL
              </th>
              <th scope="col" className="px-6 py-3">
                Simplified URL
              </th>
              <th scope="col" className="px-6 py-3">
                Open
              </th>
            </tr>
            </thead>
            <tbody>
            {links.map((link, index) => (
                <tr key={link._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 truncate max-w-[150px]">
                    {link.from}
                  </td>
                  <td className="px-6 py-4">
                    {link.to}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/detail/${link._id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Open</Link>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </>
  )
}
