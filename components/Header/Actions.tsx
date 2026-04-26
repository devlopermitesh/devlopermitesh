const Actions = () => {
  const downloadResume = () => {
    // TODO: Implement resume download
    console.log('Download resume')
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={downloadResume}
        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-3 py-2 rounded-md transition-colors text-sm font-medium"
      >
        Resume
      </button>
      {/* TODO: Add user menu */}
      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">M</span>
      </div>
    </div>
  )
}

export default Actions
