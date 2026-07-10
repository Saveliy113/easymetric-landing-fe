"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { navLinks } from "./constants/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="w-full absolute top-0 z-50 flex justify-between items-center py-6 px-6 lg:px-10 bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
            {/* Logo */}
            <Image
                src="/icons/easymetric_logo_sm.svg"
                alt="Easymetric Logo"
                width={189}
                height={35}
            />

            {/* Navigation (Desktop only) */}
            <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
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

            {/* Buttons Container (Desktop only) */}
            <div className="hidden md:flex items-center gap-4">
                <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-transparent hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                    Войти
                </Button>
                <Button
                    variant="outline"
                    className="text-brand-green bg-brand-green/10 border-brand-green hover:bg-brand-green/15 hover:text-brand-green hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm px-5 py-5"
                >
                    Регистрация
                </Button>
            </div>

            {/* Burger Menu Button (Mobile/Tablet only) */}
            <button
                id="menu__btn"
                onClick={() => setIsOpen(!isOpen)}
                className="flex md:hidden border border-white/10 w-10 h-10 rounded-lg justify-center items-center transition-all active:scale-95 touch-manipulation cursor-pointer bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white hover:border-brand-green/30"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile/Tablet Menu Drawer */}
            {isOpen && (
                <div className="absolute top-full mt-2 right-6 w-[320px] bg-brand-dark/80 backdrop-blur-xl border border-white/10 py-6 px-6 flex flex-col gap-6 md:hidden z-40 rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] animate-[fadeIn_0.2s_ease-out]">
                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-3">
                        {
                            navLinks.map((link) => (
                                <Link
                                    href={link.href}
                                    key={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-white text-base font-medium py-2 border-b border-white/5 last:border-b-0 transition-colors duration-200 text-right"
                                >
                                    {link.label}
                                </Link>
                            ))
                        }
                    </nav>

                    {/* Mobile Buttons (Horizontal Container) */}
                    <div className="flex items-center justify-end gap-3 mt-2">
                        <Button
                            variant="ghost"
                            className="text-gray-300 hover:text-white hover:bg-transparent hover:scale-105 transition-all duration-300 cursor-pointer text-sm"
                        >
                            Войти
                        </Button>
                        <Button
                            variant="outline"
                            className="text-brand-green bg-brand-green/10 border-brand-green hover:bg-brand-green/15 hover:text-brand-green hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm px-4 py-2 text-sm h-auto"
                        >
                            Регистрация
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}