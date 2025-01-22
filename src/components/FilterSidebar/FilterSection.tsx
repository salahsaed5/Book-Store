import { ChevronDown, ChevronUp } from "lucide-react";

type FilterSectionProps = {
	title: string;
	children: React.ReactNode;
	isExpanded: boolean;
	onToggle: () => void;
};

export default function FilterSection({
  title,
  children,
  isExpanded,
  onToggle,
}: FilterSectionProps) {
  return <div className="mt-4 border-t border-gray-200 pt-4">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full text-left"
    >
      <span className="text-lg font-semibold">{title}</span>
      {isExpanded ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </button>
    {isExpanded && <div className="mt-2 pl-2">{children}</div>}
  </div>
};
