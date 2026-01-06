import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Zap } from "lucide-react"
import { TOPICS, USER_STATS } from "../data/academyData"
import CourseCard from "../components/academy/CourseCard"
import CoursePlayer from "./CoursePlayer"

export default function Academy() {
    const [activeCourseId, setActiveCourseId] = useState(null)

    return (
        <div className="pb-32 animate-fade-in text-white relative">
            {/* FULLSCREEN PLAYER OVERLAY */}
            <AnimatePresence>
                {activeCourseId && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-[100] bg-charcoal" // z-100 to ensure it tops everything including Dashboard Sidebar
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
                <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-accent to-emerald-600 flex items-center justify-center shadow-lg">
                            <Award className="text-charcoal" size={24} />
                        </div>
                        <div>
                            <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Nível {USER_STATS.level}</div>
                            <div className="font-bold text-lg text-white">{USER_STATS.levelTitle}</div>
                        </div>
                    </div>
                    <div className="flex-1 max-w-xs mx-8 hidden md:block">
                        <div className="flex justify-between text-xs mb-1 text-white/50">
                            <span>{USER_STATS.xp} XP</span>
                            <span>{USER_STATS.nextLevelXp} XP</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-lime-accent to-emerald-500 w-[60%]" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-400 font-bold bg-yellow-500/10 px-3 py-1 rounded-lg">
                        <Zap size={16} fill="currentColor" />
                        <span>Streak: 5 dias</span>
                    </div>
                </div>

                {/* Main Content Title */}
                <header>
                    <h1 className="text-3xl font-bold mb-2">Academy</h1>
                    <p className="text-white/60">Domine o mercado financeiro com trilhas especializadas.</p>
                </header>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Nível" value={`Lvl ${USER_STATS.level}`} color="bg-lime-accent" />
                    <StatCard label="XP Total" value={USER_STATS.xp} color="bg-purple-500" />
                    <StatCard label="Cursos" value={USER_STATS.coursesCompleted} color="bg-blue-500" />
                    <StatCard label="Certificados" value={USER_STATS.certificates} color="bg-amber-500" />
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
        <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center gap-3">
            <div className={`w-1 h-8 rounded-full ${color}`} />
            <div>
                <p className="text-xs text-white/40 uppercase tracking-widest">{label}</p>
                <p className="font-bold text-lg">{value}</p>
            </div>
        </div>
    )
}
