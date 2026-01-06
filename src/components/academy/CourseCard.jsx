import { Play, Lock, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function CourseCard({ course, onClick }) {
    const handleCardClick = () => {
        console.log("Card Clicked! ID:", course.id)
        onClick && onClick()
    }

    const handleButtonClick = (e) => {
        e.stopPropagation()
        console.log("Button Clicked! ID:", course.id)
        onClick && onClick()
    }

    return (
        <div
            onClick={handleCardClick}
            className={`
                relative flex-none w-72 h-44 rounded-xl overflow-hidden cursor-pointer group shadow-lg
                transform transition-transform hover:scale-105 active:scale-95
                ${course.isLocked ? 'grayscale-[0.5]' : ''}
            `}
        >
            {/* Background Image */}
            <img
                src={course.thumbnail}
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

            {/* Lock Overlay */}
            {course.isLocked && (
                <div className="absolute inset-x-0 top-0 p-3 flex justify-end pointer-events-none">
                    <div className="bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10">
                        <Lock size={14} className="text-white/70" />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
                <div className="flex items-center gap-2 mb-2 text-xs text-white/60 font-medium">
                    <span className="bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock size={10} /> {course.duration}
                    </span>
                    {course.isLocked && <span className="text-yellow-400 font-bold">PLUS</span>}
                </div>

                <h4 className="text-white font-bold text-lg leading-tight mb-3 group-hover:text-lime-accent transition-colors">
                    {course.title}
                </h4>

                {/* Progress Bar */}
                {course.progress > 0 && (
                    <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                        <div
                            className="bg-lime-accent h-full rounded-full transition-all duration-1000"
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>
                )}

                {/* Play Icon (Hover) */}
                {!course.isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={handleButtonClick}
                            className="bg-lime-accent/90 p-3 rounded-full shadow-[0_0_20px_rgba(174,234,0,0.5)] backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform pointer-events-auto cursor-pointer hover:scale-110 active:scale-95 transition-all"
                        >
                            <Play size={24} className="text-charcoal fill-current ml-1" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
