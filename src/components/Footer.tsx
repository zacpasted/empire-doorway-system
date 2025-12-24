const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PASTED. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a
              href="https://getpasted.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              getpasted.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
