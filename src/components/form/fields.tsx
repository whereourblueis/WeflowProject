export const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-foreground placeholder:text-gray-400 focus:border-accent-600 focus:outline-none focus:ring-1 focus:ring-accent-600";

type ValidatableElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function handleFormInvalid(e: React.SyntheticEvent<HTMLFormElement>) {
  const target = e.target as ValidatableElement;
  if (target.validity.valueMissing) {
    target.setCustomValidity("필수 입력 항목입니다.");
  } else if (target.validity.typeMismatch) {
    target.setCustomValidity("형식을 확인해주세요.");
  }
}

export function clearFormValidity(e: React.SyntheticEvent<HTMLFormElement>) {
  (e.target as ValidatableElement).setCustomValidity("");
}

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
