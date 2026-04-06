const PastedFooter = () => {
  return (
    <footer className="relative border-t border-white/5 py-16 lg:py-20" style={{ background: "var(--color-bg)" }}>
      <div className="max-w-[1680px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="font-serif text-3xl tracking-[0.2em] mb-6">PASTED</div>
            <p className="text-white/50 text-sm max-w-sm leading-relaxed font-light">
              The operating and accountability partner behind the world's greatest aesthetic
              dental clinics.
            </p>
          </div>

          <div className="col-span-6 lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.28em] mb-5" style={{ color: "var(--color-gold)" }}>Studio</p>
            <ul className="space-y-3 text-sm text-white/60 font-light">
              <li><a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a></li>
              <li><a href="#lineup" className="hover:text-white transition-colors">Partnerships</a></li>
              <li><a href="#craft" className="hover:text-white transition-colors">Craft</a></li>
              <li><a href="#proof" className="hover:text-white transition-colors">Results</a></li>
            </ul>
          </div>

          <div className="col-span-6 lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.28em] mb-5" style={{ color: "var(--color-gold)" }}>Contact</p>
            <ul className="space-y-3 text-sm text-white/60 font-light">
              <li><a href="mailto:hello@pasted.studio" className="hover:text-white transition-colors">hello@pasted.studio</a></li>
              <li><a href="#enquire" className="hover:text-white transition-colors">Enquire</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.28em] mb-5" style={{ color: "var(--color-gold)" }}>Principle</p>
            <p className="text-white/60 text-sm italic font-serif leading-relaxed">
              Life first. Business second. Everything else follows.
            </p>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/30">
            &copy; {new Date().getFullYear()} PASTED. By invitation only.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.24em] text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PastedFooter;
