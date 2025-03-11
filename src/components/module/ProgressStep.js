export function ProgressStep() {
  return (
    <ol className="flex justify-center w-full text-xs text-gray-900 font-medium sm:text-base">
      <li className="flex w-full relative text-ocean  after:content-['']  after:w-full after:h-0.5  after:bg-ocean after:inline-block after:absolute after:top-3 after:left-4">
        <div className="block whitespace-nowrap z-10 -ml-3">
          <span className="w-6 h-6 bg-ocean border-2 border-transparent rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white">
            1
          </span>
          username
        </div>
      </li>
      <li className="flex w-full text-gray-900">
        <div className="z-10">
          <span className="w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm -ml-2 bg-white">
            2
          </span>
          <p className="-ml-12"> reset password</p>
        </div>
      </li>
    </ol>
  );
}
