function ErrorText({ styleClass, children }: { styleClass: string; children: React.ReactNode }) {
  return <p className={`tw:text-center  tw:text-error ${styleClass}`}>{children}</p>
}

export default ErrorText
