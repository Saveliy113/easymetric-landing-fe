export function Hero() {
    return (
        <section id="hero" className="relative w-full max-w-7xl mx-auto px-6 z-10">
            <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-sm font-medium mb-5">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                    </span>

                    <h6>Легкая ERP</h6>
                </div>

                <p className="max-w-lg text-5xl lg:text-6xl text-white font-bold leading-17">
                   Easymetric - ваш первый шаг к системному бизнесу
                </p>

            </div>

            <div>

            </div>
        </section>
    )
}