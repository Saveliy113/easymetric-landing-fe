import Image from "next/image"
import Link from "next/link"
import { navLinks } from "./constants/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="w-full absolute top-0 z-50 flex justify-between items-center py-6 px-6 g:px-10 bg-brand-dark border-b border-white/5">
            {/* Logo */}
            <Image
                src="/icons/easymetric_logo_sm.svg"
                alt="Easymetric Logo"
                width={189}
                height={35}
            />

            {/* Navigation */}
            <nav className="md:flex space-x-8 text-sm font-medium text-gray-300">
                {
                    navLinks.map((link) => (
                        <Link
                            href={link.href}
                            key={link.href}
                            className="hover:text-white hover:scale-105 transition-all duration-300"
                        >
                            {link.label}
                        </Link>
                    ))
                }
            </nav>

            {/* Buttons Container */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-transparent hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                    Войти
                </Button>
            </div>
        </header>
    )
}