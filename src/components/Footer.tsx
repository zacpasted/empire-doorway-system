import pastedWordmark from "@/assets/pasted-logo-wordmark.png";
import pastedEmblem from "@/assets/pasted-logo-emblem.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={pastedWordmark} alt="Pasted" className="h-5" />
            <div className="w-px h-3.5 bg-primary/30" />
            <img src={pastedEmblem} alt="Pasted emblem" className="h-5" />
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2026 PASTED™. All rights reserved.
          </p>

          <a
            href="mailto:zac@getpasted.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            zac@getpasted.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
