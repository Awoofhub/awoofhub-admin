import Image from "next/image"
import icon from "../../public/icon-park-outline_list.png"

export default function OfferQueueEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center  w-full ">
      <Image 
        src={icon} 
        alt="Empty queue icon"  
        className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] mb-4"
      />
      <h2 className="text-[16px] md:text-xl font-bold text-gray-900 mb-2">
        No deals to review
      </h2>
      <p className="text-sm text-gray-500">
        Nothing on queue yet, come back.
      </p>
    </div>
  )
}