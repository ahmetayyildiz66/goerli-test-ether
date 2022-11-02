interface CardProps {
  title: string;
  btnText: string;
  children: React.ReactNode;
}

const Card = ({ title, children, btnText }: CardProps) => {
  return (
    <div className="shadow-2xl mt-12 w-1/3 container mx-auto rounded-md">
      <div className="container mx-auto">
        <h1 className="p-4 text-xl">{title}</h1>
      </div>
      <p className="border-b-2 h-1">&nbsp;</p>
      <div className="p-4">
        {/* <p className="text-md">Enter your Ethereum address to receive tokens:</p> */}
        {children}
        <button className="bg-blue-200 w-full py-2 rounded-md text-sm">{btnText}</button>
      </div>
    </div>
  )
}

export default Card