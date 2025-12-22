import BtnSpinner from "../../loader/BtnSniper";

export default function FormButton({ ClassName,Icon, IsValid, children, loading = false, ...props }) {
  return (
  <button
  {...props}
 // disabled={IsValid || props.disabled}
  className={`${ClassName} ${
    !IsValid ? "bg-[#c99fec]" : "bg-[var(--primary-color)] hover:bg-[#a068ce]"
  } text-sm text-white py-2 px-12 rounded-lg flex justify-center items-center gap-2 transition duration-300 min-w-[160px]`}
>
  {loading ? (
    <BtnSpinner size={5} />
  ) : (
    <>
      {Icon}
      {children}
    </>
  )}
</button>
  )
}
