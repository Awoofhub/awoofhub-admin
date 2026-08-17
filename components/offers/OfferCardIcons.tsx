import { Offer } from "@/types/offer";
import { Flag, Gift, Globe, MapPin, TrendingDown, Truck } from "lucide-react";
import { FaArrowsRotate } from "react-icons/fa6";
import { LuTags } from "react-icons/lu";
import { RiCoupon4Line, RiFlashlightLine } from "react-icons/ri";
import { TbCashMoveBack } from "react-icons/tb";

const LOCATION_ICON_SIZE = 16;
const LOCATION_ICON_CLASS = "text-muted w-3 md:w-4 lg:w-5 shrink-0";

// Icon shown next to the location, based on how the offer is available
export function LocationIconFor({ location }: { location: string }) {
  if (location === "Online")
    return <Globe size={LOCATION_ICON_SIZE} className={LOCATION_ICON_CLASS} />;
  if (location === "Nationwide")
    return <Flag size={LOCATION_ICON_SIZE} className={LOCATION_ICON_CLASS} />;
  return <MapPin size={LOCATION_ICON_SIZE} className={LOCATION_ICON_CLASS} />;
}

const VALUE_ICON_SIZE = 18;
const VALUE_ICON_CLASS = "text-primary w-3 xs:w-4 lg:w-4.5 shrink-0";

// Icon shown next to the deal value, based on the offer's deal type
export function ValueIconFor({ dealType }: { dealType: Offer["dealType"] }) {
  switch (dealType) {
    case "cashback":
      return <TbCashMoveBack size={VALUE_ICON_SIZE} className={VALUE_ICON_CLASS} />;
    case "freebie":
      return <Gift size={VALUE_ICON_SIZE} className={VALUE_ICON_CLASS} />;
    case "discount":
      return <LuTags size={VALUE_ICON_SIZE} className={VALUE_ICON_CLASS} />;
    case "bogo":
      return <RiFlashlightLine size={VALUE_ICON_SIZE} className={VALUE_ICON_CLASS} />;
    case "promo_code":
      return <RiCoupon4Line size={VALUE_ICON_SIZE} className={VALUE_ICON_CLASS} />;
    case "free_trial":
      return <FaArrowsRotate size={VALUE_ICON_SIZE} className={VALUE_ICON_CLASS} />;
    case "free_delivery":
      return <Truck size={VALUE_ICON_SIZE} className={VALUE_ICON_CLASS} />;
    case "price_drop":
      return <TrendingDown size={VALUE_ICON_SIZE} className={VALUE_ICON_CLASS} />;
    default:
      return <LuTags size={VALUE_ICON_SIZE} className={VALUE_ICON_CLASS} />;
  }
}