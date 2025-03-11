function Badges({ level }) {
  return (
    <>
      {level === "Beginner" && (
        <div className="bg-pink-200 text-orange-950 w-28 text-center px-1 rounded">
          {level}
        </div>
      )}
      {level === "Intermediate" && (
        <div className="bg-blue-200 text-blue-950 w-28 text-center px-1 rounded">
          {level}
        </div>
      )}
      {level === "Advanced" && (
        <div className="bg-green-200 text-green-950 w-28 text-center px-1 rounded">
          {level}
        </div>
      )}
    </>
  )
}

export default Badges
