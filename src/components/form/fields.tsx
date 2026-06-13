export const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-foreground placeholder:text-gray-400 focus:border-accent-600 focus:outline-none focus:ring-1 focus:ring-accent-600";

export function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {children}
      {required && <span className="ml-0.5 text-accent-600">*</span>}
    </label>
  );
}
