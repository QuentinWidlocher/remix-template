import ErrorMessage from "./error-message";

type FormFieldProps = React.PropsWithChildren<{
  label?: string;
  error?: { _errors: string[] | undefined } | undefined;
  className?: string;
}>;

/**
 * Display a form field with label and error message
 */
export default function FormField({
  label,
  error,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <label className={"flex flex-col " + className}>
      {label && <span>{label}</span>}
      {children}
      <ErrorMessage error={error} className="ml-2" />
    </label>
  );
}
