import { useState, useEffect, useMemo } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Lock, PlayCircle } from "lucide-react"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SyllabusSidebar from "../components/academy/SyllabusSidebar"
import { COURSE_CONTENT } from "../data/courseContent"

export default function CoursePlayer({ courseId, onBack }) {

    useEffect(() => {
        console.log("CoursePlayer Overlay mounted with ID:", courseId)
    }, [courseId])

    // Look up course data.
    const courseData = COURSE_CONTENT[courseId] || COURSE_CONTENT["curso-01"]

    // State for current active lesson.
    const [currentLesson, setCurrentLesson] = useState(() => {
        if (courseData?.modules?.[0]?.lessons?.[0]) {
            return courseData.modules[0].lessons[0]
        }
        return null
    })

    // PROGRESS TRACKING STATE
    const [completedLessons, setCompletedLessons] = useState(() => {
        const saved = localStorage.getItem("investai_progress")
        return saved ? JSON.parse(saved) : {}
    })

    const markLessonComplete = (lessonId) => {
        setCompletedLessons(prev => {
            const courseProgress = prev[courseId] || []
            if (courseProgress.includes(lessonId)) return prev

            const newProgress = {
                ...prev,
                [courseId]: [...courseProgress, lessonId]
            }
            localStorage.setItem("investai_progress", JSON.stringify(newProgress))
            return newProgress
        })
    }

    // Flatten lessons to easily find prev/next and inject completion status
    const allLessons = useMemo(() => {
        if (!courseData) return []
        const courseProgress = completedLessons[courseId] || []

        return courseData.modules.flatMap(m => m.lessons).map(lesson => ({
            ...lesson,
            isCompleted: courseProgress.includes(lesson.id) || lesson.isCompleted
        }))
    }, [courseData, completedLessons, courseId])

    const currentLessonIndex = allLessons.findIndex(l => l.id === currentLesson?.id)
    const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null
    const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null

    // Handlers
    const handleExit = () => {
        onBack && onBack()
    }

    const handleLessonSelect = (lesson) => {
        setCurrentLesson(lesson)
    }

    const handleNext = () => {
        // Mark current as complete
        if (currentLesson) {
            markLessonComplete(currentLesson.id)
        }

        if (nextLesson && !nextLesson.isLocked) {
            handleLessonSelect(nextLesson)
        } else if (!nextLesson) {
            // Finished course
            // Mark last lesson as complete too
            if (currentLesson) markLessonComplete(currentLesson.id)
            onBack && onBack()
        }
    }

    const handlePrev = () => {
        if (prevLesson) {
            handleLessonSelect(prevLesson)
        }
    }

    // Prepare course data for sidebar with dynamic progress
    const sidebarCourseData = useMemo(() => {
        if (!courseData) return null

        const updatedModules = courseData.modules.map(m => ({
            ...m,
            lessons: m.lessons.map(l => {
                const isCompleted = completedLessons[courseId]?.includes(l.id) || l.isCompleted
                return { ...l, isCompleted }
            })
        }))

        const allUpdatedLessons = updatedModules.flatMap(m => m.lessons)
        const completedCount = allUpdatedLessons.filter(l => l.isCompleted).length
        const totalCount = allUpdatedLessons.length
        const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

        return {
            ...courseData,
            modules: updatedModules,
            progress: progress
        }
    }, [courseData, completedLessons, courseId])

    if (!courseData || !currentLesson) {
        return <div className="fixed inset-0 z-50 bg-charcoal text-white flex items-center justify-center">
            <div className="text-center">
                <p className="mb-4">Curso não encontrado.</p>
                <button onClick={handleExit} className="text-lime-accent underline">Voltar</button>
            </div>
        </div>
    }

    return (
        <div className="fixed inset-0 z-50 bg-charcoal text-white flex overflow-hidden font-sans selection:bg-lime-accent selection:text-charcoal animate-in fade-in duration-300">
            {/* Main Content Area (70%) */}
            <div className="flex-1 flex flex-col h-full relative z-0">

                {/* Sticky Header */}
                <header className="sticky top-0 bg-charcoal/90 backdrop-blur-md border-b border-white/5 z-20 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleExit}
                            className="p-2 -ml-2 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition-all group"
                            title="Salvar e Voltar"
                        >
                            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h2 className="font-bold text-lg leading-tight">{courseData.title}</h2>
                            <p className="text-xs text-white/40 font-mono mt-0.5 uppercase tracking-wider">{currentLesson.title}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Circular Progress (Desktop) could go here */}
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:px-16 xl:px-24">
                    <article className="prose prose-invert prose-lg max-w-4xl mx-auto
                        prose-headings:text-white prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-8
                        prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-strong:text-lime-accent prose-strong:font-bold
                        prose-blockquote:border-l-lime-accent prose-blockquote:text-white/80 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                        prose-li:text-gray-300 prose-ul:list-disc
                        [&>*:first-child]:mt-0"
                    >
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {currentLesson.content}
                        </Markdown>
                    </article>

                    {/* Bottom Action Bar (in flow) */}
                    <div className="max-w-4xl mx-auto mt-20 pb-20 flex items-center justify-between pt-8 border-t border-white/5">
                        <button
                            onClick={handlePrev}
                            disabled={!prevLesson}
                            className={`flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 font-bold transition-all
                                ${!prevLesson ? 'opacity-0 cursor-default' : 'hover:bg-white/5 hover:border-white/20 text-white'}`}
                        >
                            <ChevronLeft size={20} />
                            Aula Anterior
                        </button>

                        <button
                            onClick={handleNext}
                            className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all shadow-lg
                                ${!nextLesson
                                    ? 'bg-emerald-500 text-charcoal hover:brightness-110 hover:shadow-emerald-500/20' // Active "Complete" style
                                    : 'bg-lime-accent text-charcoal hover:brightness-110 hover:shadow-lime-accent/20'}`}
                        >
                            {nextLesson ? "Próxima Aula" : "Concluir Curso"}
                            {nextLesson ? <ChevronRight size={20} /> : <CheckCircle size={20} />}
                        </button>
                    </div>
                </main>
            </div>

            {/* Syllabus Sidebar (30%) */}
            <aside className="w-[30%] min-w-[320px] max-w-[400px] hidden lg:block h-full relative z-10 shadow-2xl">
                <SyllabusSidebar
                    course={sidebarCourseData}
                    currentLessonId={currentLesson.id}
                    onSelectLesson={handleLessonSelect}
                />
            </aside>
        </div>
    )
}
