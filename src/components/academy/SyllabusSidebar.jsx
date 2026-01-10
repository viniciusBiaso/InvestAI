import { ChevronDown, ChevronRight, CheckCircle, Lock, PlayCircle, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import clsx from "clsx"

export default function SyllabusSidebar({ course, currentLessonId, onSelectLesson }) {
    // Keep track of expanded modules. Default all open for now.
    const [expandedModules, setExpandedModules] = useState(
        course.modules.map((_, idx) => idx)
    )

    const toggleModule = (index) => {
        setExpandedModules(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    // Flatten lessons to calculate index for "Módulo X - Aula Y"
    let absoluteLessonIndex = 0

    return (
        <div className="w-full h-full bg-white dark:bg-zinc-900 border-l border-slate-200 dark:border-white/5 flex flex-col transition-colors">
            <div className="p-6 border-b border-slate-200 dark:border-white/5">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">Conteúdo do Curso</h3>
                <p className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-widest font-medium">
                    {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Aulas • {course.progress}% Concluído
                </p>
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 dark:bg-lime-accent"
                        style={{ width: `${course.progress}%` }}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {course.modules.map((module, moduleIdx) => (
                    <div key={moduleIdx} className="border-b border-slate-200 dark:border-white/5 last:border-0">
                        <button
                            onClick={() => toggleModule(moduleIdx)}
                            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                        >
                            <span className="font-semibold text-slate-700 dark:text-white/80 group-hover:text-slate-900 dark:group-hover:text-white transition-colors text-sm text-left">
                                {module.title}
                            </span>
                            {expandedModules.includes(moduleIdx)
                                ? <ChevronDown size={16} className="text-slate-400 dark:text-white/40" />
                                : <ChevronRight size={16} className="text-slate-400 dark:text-white/40" />
                            }
                        </button>

                        <AnimatePresence>
                            {expandedModules.includes(moduleIdx) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden bg-slate-50 dark:bg-black/20"
                                >
                                    {module.lessons.map((lesson) => {
                                        absoluteLessonIndex++
                                        const isActive = lesson.id === currentLessonId
                                        const isLocked = lesson.isLocked

                                        return (
                                            <div
                                                key={lesson.id}
                                                onClick={() => !isLocked && onSelectLesson(lesson)}
                                                className={clsx(
                                                    "relative py-3 px-4 flex items-start gap-3 cursor-pointer transition-all border-l-[3px]",
                                                    isActive
                                                        ? "bg-emerald-100 dark:bg-emerald-900/20 border-emerald-500 dark:border-lime-accent"
                                                        : "border-transparent hover:bg-slate-100 dark:hover:bg-white/5",
                                                    isLocked && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                                )}
                                            >
                                                {/* Status Icon */}
                                                <div className="mt-0.5 shrink-0">
                                                    {lesson.isCompleted ? (
                                                        <CheckCircle size={16} className="text-emerald-500" />
                                                    ) : isLocked ? (
                                                        <Lock size={16} className="text-slate-400 dark:text-white/30" />
                                                    ) : isActive ? (
                                                        <PlayCircle size={16} className="text-emerald-600 dark:text-lime-accent" />
                                                    ) : (
                                                        <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-white/20" />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className={clsx(
                                                        "text-sm font-medium leading-snug mb-1",
                                                        isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-white/70",
                                                        lesson.isCompleted && "text-slate-400 dark:text-white/40 line-through decoration-slate-300 dark:decoration-white/20"
                                                    )}>
                                                        {lesson.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-wider font-mono">
                                                        <span>{lesson.type === 'video' ? 'Vídeo' : 'Texto'}</span>
                                                        <span>•</span>
                                                        <span>{lesson.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    )
}
