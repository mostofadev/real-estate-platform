import Link from "next/link";

// eslint-disable-next-line react/prop-types
function PrimaryButton({
  Icon,
  href,
  to,
  target,
  onClick,
  className,
  children,
}) {
  const baseClasses =
    "flex items-center bg-[#9d4edd] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300";
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
        <Link
          href={to}
          className={`${classes}`}
        >
          <div className=" flex items-center justify-center gap-2">
            <span className="block">{children}</span>
            <span className="block">{Icon}</span>
          </div>
        </Link>
      )}
      {!to && !href && (
        <button
          onClick={onClick}
          className={`${className} w-full flex text-center items-center bg-[#9d4edd] text-white font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300`}
        >
          {children}
          {Icon}
        </button>
      )}
    </>
  );
}

export default PrimaryButton;
