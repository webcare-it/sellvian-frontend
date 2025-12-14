import { cn } from "@/lib/utils";

export const Placeholder = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-gray-200 flex items-center justify-center w-full h-full object-cover relative",
        className
      )}>
      <svg
        className="w-8 h-8 text-gray-400"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path d="M8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" />
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
};
