import Image from "next/image"
import icon from "../../public/ix_support.png"

export default function OfferQueueEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center  w-full ">
      <Image 
        src={icon} 
        alt="Empty queue icon"  
        className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] mb-4"
      />
      <h2 className="text-[16px] md:text-xl font-bold text-gray-900 mb-2">
       No raised ticket yet
      </h2>
      <p className="text-sm text-gray-500">
        Nothing to resolve here, come back.
      </p>
    </div>
  )
}