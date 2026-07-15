const Section = ({
  title,
  subtitle,
  action,
  children,
  className = "",
}) => {
  return (
    <section className={`mb-12 ${className}`}>
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {title && (
              <h2 className="text-xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-2xl">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      {children}
    </section>
  );
};

export default Section;
