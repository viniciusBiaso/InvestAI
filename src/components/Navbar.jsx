import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/Button"
import { Menu, X, ArrowRight } from "lucide-react"

export default function Navbar({ onLogin }) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-charcoal/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-accent to-wealth-green flex items-center justify-center">
                        <span className="font-bold text-charcoal">I</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">InvestAI</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm text-white/70 hover:text-lime-accent transition-colors">Funcionalidades</a>
                    <a href="#how-it-works" className="text-sm text-white/70 hover:text-lime-accent transition-colors">Como funciona</a>
                    <a href="#pricing" className="text-sm text-white/70 hover:text-lime-accent transition-colors">Planos</a>
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={onLogin}>Login</Button>
                    <Button size="sm" className="group" onClick={onLogin}>
                        Começar Grátis
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-charcoal border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-xl"
                        onMouseLeave={() => setMobileMenuOpen(false)}
                    >
                        <a href="#features" className="text-lg text-white/90" onClick={() => setMobileMenuOpen(false)}>Funcionalidades</a>
                        <a href="#pricing" className="text-lg text-white/90" onClick={() => setMobileMenuOpen(false)}>Planos</a>
                        <div className="h-px bg-white/10 my-2" />
                        <Button variant="outline" className="w-full justify-center" onClick={() => { setMobileMenuOpen(false); onLogin(); }}>Login</Button>
                        <Button className="w-full justify-center" onClick={() => { setMobileMenuOpen(false); onLogin(); }}>Começar Agora</Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
