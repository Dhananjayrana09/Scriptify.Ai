import Link from "next/link";
import Image from "next/image";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="text-gray-600 transition-colors duration-200 hover:text-purple-500">
      {children}
    </Link>
  );
};

export default function Header() {
  return (
    <nav className="container flex items-center justify-between px-4 py-4 lg:px-8 mx-auto">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-4">
        <NavLink href="/">
          <span className="flex items-center gap-2">
            <Image
              src="/icon.ico"
              alt="Scriptify logo"
              width={32}
              height={32}
              className="hover:rotate-12 transform transition duration-200 ease-in-out"
            />
            <span className="font-extrabold text-lg">Scriptify.Ai</span>
          </span>
        </NavLink>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="hidden lg:flex flex-1 justify-center gap-8 items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <NavLink href="/#posts">Your Posts</NavLink>
      </div>

      {/* Right Section - Extra Links */}
      <div className="flex items-center gap-4 lg:justify-end">
        <NavLink href="/dashboard">Upload a Video</NavLink>
        <NavLink href="/sign-in">Sign In</NavLink>
      </div>
    </nav>
  );
}
