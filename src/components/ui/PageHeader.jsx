const PageHeader = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

      <div className="max-w-3xl">

        <h1 className="text-5xl font-bold tracking-tight leading-tight">

          {title}

        </h1>

        {description && (

          <p className="mt-4 text-lg leading-8 text-zinc-400">

            {description}

          </p>

        )}

      </div>

      {action && (

        <div className="flex-shrink-0">

          {action}

        </div>

      )}

    </div>
  );
};

export default PageHeader;