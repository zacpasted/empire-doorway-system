import pastedWordmark from "@/assets/pasted-logo-wordmark.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={pastedWordmark} alt="Pasted" className="h-6" />
          
          <p className="text-sm text-muted-foreground">
            © 2026 PASTED™. All rights reserved.
          </p>

          <a
            href="mailto:studio@pasted.studio"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            studio@pasted.studio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
