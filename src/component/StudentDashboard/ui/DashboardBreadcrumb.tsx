import { ArrowLeft } from "lucide-react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type DashboardBreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function DashboardBreadcrumb({
  items,
  className = "",
}: DashboardBreadcrumbProps) {
  const navigate = useNavigate();
  const parent = items.length > 1 ? items[items.length - 2] : items[0];

  function handleBack() {
    if (parent?.to) {
      navigate(parent.to);
      return;
    }

    navigate(-1);
  }

  return (
    <div
      className={`mb-4 flex min-w-0 flex-wrap items-center gap-2 text-sm font-medium text-[#001F3F] sm:mb-6 sm:gap-3 sm:text-base ${className}`}
    >
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:bg-[#001F3F]/10 sm:h-auto sm:w-auto sm:rounded-none"
      >
        <ArrowLeft size={18} className="sm:h-5 sm:w-5" />
      </button>

      <nav
        className="flex min-w-0 items-center gap-2 overflow-hidden"
        aria-label="Breadcrumb"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const visibility = isLast ? "" : "hidden sm:inline";

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && (
                <span className={`${visibility} shrink-0`} aria-hidden="true">
                  /
                </span>
              )}

              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className={`${visibility} shrink-0 transition hover:underline`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "truncate font-semibold"
                      : `${visibility} shrink-0`
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
}
