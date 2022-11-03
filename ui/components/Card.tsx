interface CardProps {
  title: string;
  btnText: string;
  children: React.ReactNode;
  handleAction: () => void;
}

const Card = ({ title, children, btnText, handleAction }: CardProps) => {
  return (
    <div className="shadow-2xl mt-12 w-1/3 container mx-auto rounded-md">
      <div className="container mx-auto">
        <h1 className="p-4 text-xl">{title}</h1>
      </div>
      <p className="border-b-2 h-1">&nbsp;</p>
      <div className="p-4">
        {children}
        <button className="bg-blue-200 w-full py-2 rounded-md text-sm" onClick={handleAction}>{btnText}</button>
      </div>
    </div>
  )
}

export default Card