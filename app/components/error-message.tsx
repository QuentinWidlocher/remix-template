type ErrorMessageProps = {
  error?: { _errors?: string[] };
  onlyFirst?: boolean;
  className?: string;
};

export default function ErrorMessage({
  error,
  className = "",
  onlyFirst = true,
}: ErrorMessageProps) {
  return error?._errors?.length ? (
    <small className={"text-sm text-red-500 " + className}>
      {onlyFirst
        ? error._errors[0]
        : error._errors.map((e, i, l) => (
            <span key={e}>
              {e} {i <= l.length ? <br /> : null}
            </span>
          ))}
    </small>
  ) : null;
}
