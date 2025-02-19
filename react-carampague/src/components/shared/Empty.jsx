import { Link } from "react-router-dom"

export const Empty = ({message, link}) => {
  return (
    <div className="flex  flex-col items-center w-full text-center gap-5 p-2">
        <span className='text-sky-700 font-bold text-2xl'>{message}</span>
        <Link
          to={link}
          className="bg-sky-800 hover:bg-sky-950 text-sm text-white p-2 md:w-1/4 uppercase font-bold cursor-pointer rounded"
        >
          Toca aqui para crear
        </Link>
    </div>
  )
}
