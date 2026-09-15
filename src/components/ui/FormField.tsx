import { useId } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

type BaseProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

type InputProps = BaseProps & {
  as?: "input";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

type TextareaProps = BaseProps & {
  as: "textarea";
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className">;

type SelectProps = BaseProps & {
  as: "select";
  children: ReactNode;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className">;

export type FormFieldProps = InputProps | TextareaProps | SelectProps;

const controlBase =
  "block w-full rounded-[var(--radius-md)] border bg-white px-3.5 py-2.5 " +
  "text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-soft)] " +
  "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand-500)]/40 " +
  "focus:border-[color:var(--color-brand-600)] min-h-[44px] text-base";

export function FormField(props: FormFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errId = `${id}-err`;
  const describedBy =
    [props.hint ? hintId : null, props.error ? errId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const borderCls = props.error
    ? "border-[color:var(--color-danger)]"
    : "border-[color:var(--color-line-strong)]";

  return (
    <div className={cn("flex flex-col gap-1.5", props.className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {props.label}
        {props.required ? (
          <span
            aria-hidden="true"
            className="ml-1 text-[color:var(--color-danger)]"
          >
            *
          </span>
        ) : null}
      </label>

      {renderControl(props, {
        id,
        describedBy,
        controlClass: cn(controlBase, borderCls),
      })}

      {props.hint && !props.error ? (
        <p id={hintId} className="text-xs text-[color:var(--color-ink-muted)]">
          {props.hint}
        </p>
      ) : null}
      {props.error ? (
        <p id={errId} className="text-xs text-[color:var(--color-danger)]">
          {props.error}
        </p>
      ) : null}
    </div>
  );
}

function renderControl(
  props: FormFieldProps,
  { id, describedBy, controlClass }: {
    id: string;
    describedBy: string | undefined;
    controlClass: string;
  },
) {
  if (props.as === "textarea") {
    const { as: _a, label: _l, hint: _h, error: _e, className: _c, required, ...rest } =
      props;
    void _a; void _l; void _h; void _e; void _c;
    return (
      <textarea
        id={id}
        aria-describedby={describedBy}
        aria-invalid={props.error ? true : undefined}
        required={required}
        rows={rest.rows ?? 4}
        className={controlClass}
        {...rest}
      />
    );
  }
  if (props.as === "select") {
    const { as: _a, label: _l, hint: _h, error: _e, className: _c, required, children, ...rest } =
      props;
    void _a; void _l; void _h; void _e; void _c;
    return (
      <select
        id={id}
        aria-describedby={describedBy}
        aria-invalid={props.error ? true : undefined}
        required={required}
        className={controlClass}
        {...rest}
      >
        {children}
      </select>
    );
  }
  const { as: _a, label: _l, hint: _h, error: _e, className: _c, required, ...rest } =
    props as InputProps;
  void _a; void _l; void _h; void _e; void _c;
  return (
    <input
      id={id}
      aria-describedby={describedBy}
      aria-invalid={props.error ? true : undefined}
      required={required}
      className={controlClass}
      {...rest}
    />
  );
}
