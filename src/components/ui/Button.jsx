import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"

const Button = React.forwardRef(({ className, variant = "primary", size = "default", isLoading, children, ...props }, ref) => {
    const variants = {
        primary: "bg-lime-accent text-charcoal hover:shadow-[0_0_20px_rgba(174,234,0,0.4)] hover:scale-105 active:scale-95",
        outline: "border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-lime-accent/50",
        ghost: "text-white/70 hover:text-lime-accent hover:bg-white/5",
        link: "text-lime-accent underline-offset-4 hover:underline"
    }

    const sizes = {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-lg",
        icon: "h-11 w-11"
    }

    return (
        <motion.button
            ref={ref}
            layout
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className={cn(
                "inline-flexitems-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-accent disabled:pointer-events-none disabled:opacity-50",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </motion.button>
    )
})
Button.displayName = "Button"

export { Button }
