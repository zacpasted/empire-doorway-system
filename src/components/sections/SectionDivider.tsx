interface SectionDividerProps {
  text: string;
}

const SectionDivider = ({ text }: SectionDividerProps) => {
  return (
    <div className="py-12 md:py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <p className="text-center text-foreground/70 font-serif text-lg md:text-xl italic">
          {text}
        </p>
      </div>
    </div>
  );
};

export default SectionDivider;
