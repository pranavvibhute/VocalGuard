export default function Header() {
  return (
    <header className='fixed top-0 left-0 w-full flex items-center justify-between py-4 bg-gray-900 bg-opacity-85 text-white '>
      <h1 className='text-4xl font-bold mx-4'>VocalGuard</h1>
      <nav className='space-x-4 mr-5'>
      <a
  href="#how"
  className="p-2 font-medium rounded transition duration-300 hover:text-green-400 hover:shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e] hover:outline-none"
>
  How It Works
</a>
<a
  href="#features"
  className="p-2 font-medium rounded transition duration-300 hover:text-green-400 hover:shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e] hover:outline-none"
>
  Features
</a>
<a
  href="#try"
  className="p-2 font-medium rounded transition duration-300 hover:text-green-400 hover:shadow-[0_0_10px_#22c55e,0_0_20px_#22c55e] hover:outline-none"
>
  Try Demo
</a>

      </nav>
    </header>
  );
}