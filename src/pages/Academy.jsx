import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Zap } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { TOPICS, USER_STATS, LEVEL_THRESHOLDS } from "../data/academyData"
import CourseCard from "../components/academy/CourseCard"
import CoursePlayer from "./CoursePlayer"

export default function Academy() {
    const [activeCourseId, setActiveCourseId] = useState(null)
    const [progressData, setProgressData] = useState({})

    // Auth context to get user ID
    const { user } = useAuth()

    // Load progress from localStorage on mount (and when player closes)
    useEffect(() => {
        if (!user) return

        const loadProgress = () => {
            const storageKey = `investai_progress_${user.id}`
            const saved = localStorage.getItem(storageKey)
            if (saved) {
                setProgressData(JSON.parse(saved))
            } else {
                setProgressData({}) // Reset if no data for this user
            }
        }
        loadProgress()

        // Listen for storage events (if tabs change) or custom events
        window.addEventListener('storage', loadProgress)
        return () => window.removeEventListener('storage', loadProgress)
    }, [activeCourseId, user]) // Reload when closing player to update stats

    // Calculate Dynamic Stats
    const stats = useMemo(() => {
        let totalXP = 0
        let completedCoursesCount = 0

        // Iterate through all defined courses in TOPICS
        TOPICS.forEach(topic => {
            topic.courses.forEach(course => {
                const courseIdStr = String(course.id)
                const completedLessons = progressData[courseIdStr] || []

                // Calculate Course Progress Ratio
                // Note: We use course.lessonsCount defined in data, or default to 5 if missing
                const totalLessons = course.lessonsCount || 5
                const lessonsDoneCount = completedLessons.length

                const ratio = Math.min(lessonsDoneCount / totalLessons, 1)

                // Add proportional XP
                totalXP += Math.floor(course.xp * ratio)

                if (ratio === 1) completedCoursesCount++
            })
        })

        // Determine Level
        // Find the highest level where minXp <= totalXP
        // We reverse logic: find first level that is > totalXP, then step back? 
        // Or simpler: sort descent and find first matches.

        let currentLevelObj = LEVEL_THRESHOLDS[0]
        let nextLevelObj = LEVEL_THRESHOLDS[1]

        for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
            if (totalXP >= LEVEL_THRESHOLDS[i].minXp) {
                currentLevelObj = LEVEL_THRESHOLDS[i]
                nextLevelObj = LEVEL_THRESHOLDS[i + 1] || null // null if max level
            } else {
                break
            }
        }

        // Calculate Progress to Next Level
        let progressToNext = 100
        let xpInLevel = 0
        let xpNeededForLevel = 0

        if (nextLevelObj) {
            // User requested "Cumulative" feel: 1500 XP towards 3000 XP goal should be 50%, not 0% of the new level.
            // Old Logic (per level): (totalXP - currentLevelObj.minXp) / (nextLevelObj.minXp - currentLevelObj.minXp)
            // New Logic (cumulative): totalXP / nextLevelObj.minXp
            const xpCeiling = nextLevelObj.minXp
            progressToNext = Math.round((totalXP / xpCeiling) * 100)
        }

        return {
            level: currentLevelObj.level,
            levelTitle: currentLevelObj.title,
            currentXP: totalXP,
            nextXP: nextLevelObj ? nextLevelObj.minXp : "MAX",
            progressPercent: progressToNext,
            completedCourses: completedCoursesCount
        }
    }, [progressData])

    return (
        <div className="pb-32 animate-fade-in text-slate-900 dark:text-white relative transition-colors duration-300">
            {/* FULLSCREEN PLAYER OVERLAY */}
            <AnimatePresence>
                {activeCourseId && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[100] bg-white dark:bg-charcoal" // z-100 to ensure it tops everything including Dashboard Sidebar
                    >
                        <CoursePlayer
                            courseId={activeCourseId}
                            onBack={() => setActiveCourseId(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Gamification Header */}
            <div className="space-y-10">
                <div className="flex items-center justify-between bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4 shadow-sm dark:shadow-none transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-accent to-emerald-600 flex items-center justify-center shadow-lg relative">
                            <Award className="text-charcoal" size={24} />
                            {/* Pulse Effect for Level Up feeling */}
                            <div className="absolute inset-0 bg-lime-accent rounded-full animate-ping opacity-20"></div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-widest font-bold">Nível {stats.level}</div>
                            <div className="font-bold text-lg text-slate-900 dark:text-white">{stats.levelTitle}</div>
                        </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="flex-1 max-w-md mx-8 hidden md:block">
                        <div className="flex justify-between text-xs mb-1 text-slate-400 dark:text-white/50 font-mono">
                            <span>0 XP</span> {/* Fixed start at 0 for cumulative view */}
                            <span>{stats.nextXP} XP</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden relative">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-white/5"></div>
                            <motion.div
                                className="h-full bg-gradient-to-r from-lime-accent to-emerald-500 shadow-[0_0_15px_rgba(132,204,22,0.5)]"
                                initial={{ width: 0 }}
                                // Ensure at least 2% width if user has started (lvl > 1 or xp > 0), to avoid "empty bar" feeling
                                animate={{ width: `${Math.max(stats.progressPercent, stats.currentXP > 0 ? 2 : 0)}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                        <div className="text-right text-[10px] text-slate-400 dark:text-white/30 mt-1 uppercase tracking-wider">
                            {stats.nextXP !== "MAX" ? `Faltam ${stats.nextXP - stats.currentXP} XP` : "Nível Máximo"}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-bold bg-yellow-100 dark:bg-yellow-500/10 px-3 py-1 rounded-lg border border-yellow-200 dark:border-yellow-500/20">
                        <Zap size={16} fill="currentColor" />
                        <span>Streak: {USER_STATS.streak} dias</span>
                    </div>
                </div>

                {/* Main Content Title */}
                <header>
                    <h1 className="text-3xl font-bold mb-2">Academy</h1>
                    <p className="text-slate-600 dark:text-white/60">Domine o mercado financeiro com trilhas especializadas.</p>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Nível" value={`Lvl ${stats.level}`} color="bg-lime-accent" />
                    <StatCard label="XP Total" value={stats.currentXP} color="bg-purple-500" />
                    <StatCard label="Cursos" value={stats.completedCourses} color="bg-blue-500" />
                    <StatCard label="Certificados" value="0" color="bg-amber-500" />
                </div>

                {/* Tracks */}
                <div className="space-y-8">
                    {TOPICS.map((topic, idx) => (
                        <div key={idx} className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <div className={`w-2 h-6 rounded-full bg-gradient-to-b ${topic.color}`} />
                                {topic.title}
                            </h3>
                            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
                                {topic.courses.map(course => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        onClick={() => {
                                            console.log("Opening player for:", course.id)
                                            setActiveCourseId(course.id)
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function StatCard({ label, value, color }) {
    return (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl p-4 flex items-center gap-3 shadow-sm dark:shadow-none transition-colors">
            <div className={`w-1 h-8 rounded-full ${color}`} />
            <div>
                <p className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-widest">{label}</p>
                <p className="font-bold text-lg text-slate-900 dark:text-white">{value}</p>
            </div>
        </div>
    )
}
