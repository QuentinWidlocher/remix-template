import ErrorMessage from "./error-message";

type FormFieldProps = React.PropsWithChildren<{
  label?: string;
  error?: { _errors: string[] | undefined } | undefined;
}>;

/**
 * Display a form field with label and error message
 */
export default function FormField({ label, error, children }: FormFieldProps) {
  return (
    <label className="flex flex-col">
      {label && <span>{label}</span>}
      {children}
      <ErrorMessage error={error} className="ml-2" />
    </label>
  );
}
