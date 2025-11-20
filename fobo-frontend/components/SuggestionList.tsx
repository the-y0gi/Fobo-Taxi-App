"use client";

export default function SuggestionList({ results, onSelect }: any) {
  if (!results || results.length === 0) return null;

  return (
    <div className="bg-white mt-1 border rounded-xl shadow-md max-h-56 overflow-auto">
      {results.map((item: any, index: number) => (
        <div
          key={index}
          onClick={() => onSelect(item)}
          className="flex gap-3 cursor-pointer p-3 hover:bg-gray-100 rounded-lg"
        >
          {/* Location Icon */}
          <span className="text-purple-600 text-xl">📍</span>

          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {item.display_name.split(",")[0]}
            </span>
            <span className="text-gray-500 text-sm truncate">
              {item.display_name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
