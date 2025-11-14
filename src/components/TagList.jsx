export default function TagList({ tags = [], onClickTag, selectedTag }) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, idx) => {
        const isSelected = tag === selectedTag;
        return (
          <span
            key={idx}
            className={`cursor-pointer text-xs font-medium px-3 py-1 rounded-full transition
              ${isSelected 
                ? "bg-blue-500 text-white" 
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            title={`Tag: ${tag}`}
            onClick={() => onClickTag?.(tag)}
          >
            #{tag}
          </span>
        );
      })}
    </div>
  );
}
