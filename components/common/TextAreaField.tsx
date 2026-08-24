// components/common/TextareaField.tsx
interface TextareaFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export default function TextareaField({
  value,
  onChange,
  placeholder,
  height = "h-24",
}: TextareaFieldProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none text-sm ${height}`}
    />
  );
}