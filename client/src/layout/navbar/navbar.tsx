import ThemeToggle from "@/features/theme/theme-toggle";

const Navbar = () => {
  return (
    <nav className="py-2 border-b">
      <div className="flex items-center gap-5 justify-between max-w-4xl mx-auto">
        <h1>Online Code Execution</h1>
        <ul>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
