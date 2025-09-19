const HeroSection = ({
  title,
  description,
  content,
  id,
  noMaxWidth = false,
}: {
  title: string
  description: string
  content: React.ReactNode
  id: string
  noMaxWidth?: boolean
}) => {
  const containerClass = `relative z-10 ${noMaxWidth ? "" : "max-w-6xl"} mx-auto mb-20`;
  return (
    <section id={id} className="relative py-24 px-4 overflow-hidden">
      <div className={containerClass}>
        <h2 className="text-4xl font-bold text-center mb-8">
          {title}
        </h2>
        <p className="text-lg text-foreground mb-8 max-w-2xl mx-auto text-center">
          {description}
        </p>
        {content}
      </div>
    </section>
  );
};

export { HeroSection };
