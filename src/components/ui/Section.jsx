const Section = ({
  title,
  subtitle,
  action,
  children,
  className = "",
}) => {
  return (
    <section className={`mb-16 ${className}`}>

      {(title || subtitle || action) && (

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            {title && (

              <h2 className="text-3xl font-semibold tracking-tight">

                {title}

              </h2>

            )}

            {subtitle && (

              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">

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