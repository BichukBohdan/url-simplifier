export default function LinkCard({link}) {
  return (
      <div className="bg-sky-500 shadow-md rounded-md p-4 w-full max-w-md">
        <h2 className="text-white text-xl font-bold mb-4">Link</h2>

        <div className="flex flex-col items-start gap-2">
          <p className="text-gray-200">Your URL:</p>
          <a href={link.to} target="_blank" rel="noopener noreferrer"
             className="text-blue-200 underline hover:text-blue-50">
            {link.to}
          </a>
        </div>

        <div className="flex flex-col items-start gap-2 mt-4">
          <p className="text-gray-200">From:</p>
          <a href={link.from} target="_blank" rel="noopener noreferrer"
             className="text-blue-200 underline hover:text-blue-50 truncate w-[100%]">
            {link.from}
          </a>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <p className="text-gray-200">Clicks amount:</p>
          <strong className="text-lg font-bold text-white">{link.clicks}</strong>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <p className="text-gray-200">Creation date:</p>
          <strong className="text-lg text-white">{new Date(link.date).toLocaleDateString()}</strong>
        </div>
      </div>
  )
}
