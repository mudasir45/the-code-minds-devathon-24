
import Link from 'next/link';
import Logo from "@/app/_assets/logo.png"
import Image from 'next/image';

export default function Header(){
    return <header className="bg-black text-white shadow-md">
    <div className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
      <Link href="/">
        <Image
          src={Logo}
          alt="Society Management Logo"
          className="h-12 object-contain"
          width={120}
          height={40}
        />
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/contact"
          className="bg-white border border-black hover:border-white text text-black py-2 px-4 rounded-lg hover:text-white hover:bg-black transition"
        >
          Contact Us
        </Link>
        
      </div>
    </div>
  </header>

}



