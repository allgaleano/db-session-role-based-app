
interface FormWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const FormWrapper = ({ 
  children,
  title,
  description
} : FormWrapperProps) => {
  return (
    <div className="w-[90%] max-w-[400px] flex flex-col items-center justify-center">
      <div className="text-center mb-4 flex flex-col space-y-2">
        <h1 className="font-semibold text-xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}