import { Camera, Save } from "lucide-react"

export default function ProfileTab({ user }) {
    return (
        <div className="max-w-2xl space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold">Meu Perfil</h2>

            {/* Avatar Section */}
            <div className="flex items-center gap-6">
                <div className="relative group cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-lime-accent to-emerald-600 flex items-center justify-center text-charcoal font-bold text-3xl overflow-hidden shadow-lg">
                        {user.name.charAt(0)}
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="text-white" size={24} />
                    </div>
                </div>
                <div>
                    <button className="text-sm font-bold bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 px-4 py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white">
                        Alterar Foto
                    </button>
                    <p className="text-xs text-slate-400 dark:text-white/40 mt-2">JPG ou PNG. Max 2MB.</p>
                </div>
            </div>

            {/* Form */}
            <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500 dark:text-white/60 uppercase tracking-widest">Nome Completo</label>
                        <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-accent/50 transition-colors text-slate-900 dark:text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-500 dark:text-white/60 uppercase tracking-widest">Celular</label>
                        <input
                            type="tel"
                            placeholder="(11) 99999-9999"
                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-accent/50 transition-colors text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 dark:text-white/60 uppercase tracking-widest">E-mail</label>
                    <input
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-slate-400 dark:text-white/50 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-400 dark:text-white/30">O e-mail não pode ser alterado.</p>
                </div>

                <div className="pt-4">
                    <button type="button" className="flex items-center gap-2 bg-lime-accent text-charcoal font-bold px-6 py-3 rounded-xl hover:brightness-110 transition-all">
                        <Save size={18} />
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    )
}
