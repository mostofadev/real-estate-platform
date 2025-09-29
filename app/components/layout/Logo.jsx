import Image from 'next/image';   // এটা যোগ করতে হবে
import LogoImage from '../../../public/next.svg';

function Logo() {
  return (
    <div className="flex shrink-0 items-center hidden lg:block">
      <Image
        width={32}
        alt="Your Company"
        src={LogoImage}
        className="h-8 w-auto"
      />
    </div>
  );
}

export default Logo;
