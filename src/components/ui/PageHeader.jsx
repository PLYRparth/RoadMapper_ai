const PageHeader = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        {title && (
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl">
            {title}
          </h1>
        )}

        {description && (
          <p className="mt-4 text-lg leading-8 text-zinc-400">
            {description}
          </p>
        )}
      </div>

      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

export default PageHeader;
