export default function LiveProjectButton() {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base px-8 py-3 sm:px-10 sm:py-3.5 inline-block hover:bg-[#D7E2EA]/10 transition-colors duration-200 whitespace-nowrap"
    >
      Live Project
    </a>
  )
}
