export default function TagList({ tags = [], onClickTag }) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="cursor-pointer text-xs font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition"
          title={`Tag: ${tag}`}
          onClick={() => onClickTag?.(tag)}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
