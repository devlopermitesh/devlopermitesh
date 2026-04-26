import Link from "next/link";

const Navigation = () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contactme", label: "Contact" },
  ];

  return (
    <nav className="hidden md:flex space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
