import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-0.5 md:gap-1 cursor-pointer hover:opacity-80 transition-opacity">
      <img
        src="/partexpress-logo.png"
        alt="PartExpress Logo"
        width="40"
        height="40"
        className="flex-shrink-0 md:w-[60px] md:h-[60px]"
      />

      <span className="font-bold text-xs md:text-lg text-white">PartExpress</span>
    </Link>
  )
}
