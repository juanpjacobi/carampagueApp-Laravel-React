export const Alerta = ({error}) => {
  return (
    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
    {error}
  </span>
  )
}
