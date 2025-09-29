import Link from "next/link";

// eslint-disable-next-line react/prop-types
function PrimaryButton({ Icon, href, to, target, onClick, className, children }) {
  const baseClasses =
    "flex items-center bg-[#9d4edd] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300";
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <>
      {href && (
        <a href={href} className={classes} target={target}>
          
          {children}
          {Icon}
        </a>
      )}
      {to && (
        <Link href={to} className={classes}>
         
          {children}
           {Icon}
        </Link>
      )}
      {!to && !href && (
        <button
          onClick={onClick}
          className="flex items-center bg-[#9d4edd] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300"
        >
         
          {children}
           {Icon}
        </button>
      )}
    </>
  );
}

export default PrimaryButton;
