import { CheckCircle, Clock, Tag, XCircle } from "lucide-react";
import { UserDashboard } from "@/types/dashboard";


interface StatCard {
    label: string;
    valueGetter: (stats: UserDashboard) => number;
    iconBg: string;
}


export default function UserDashboardCard({ stats }: { stats: UserDashboard | null }) {
    if (!stats) return null;
  const cards: StatCard[] = [
    { label: 'Offers Posted', valueGetter: (s) => s.offers.totalUserOffers, iconBg: 'text-emerald-900' },
    { label: 'Approved ',    valueGetter: (s) => s.offers.activeUserOffers, iconBg: 'text-green-900' },
    { label: 'Rejected ',    valueGetter: (s) => s.offers.rejectedUserOffers, iconBg: 'text-rose-900' },
    { label: 'Expired ',     valueGetter: (s) => s.offers.expiredUserOffers,  iconBg: 'text-red-900' },
    { label: 'Comments ', valueGetter: (s) => s.comments.totalUserComments, iconBg: 'text-emerald-900' },
  ];   
  
return (
  <div className="bg-white p-3 sm:p-4 mt-3 sm:mt-4 w-full text-center">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 text-center">
      {cards.map((card) => (
        <div key={card.label} className="bg-white px-6 py-4 justify-center rounded-lg border border-gray-100 text-center align-middle self-center flex flex-col gap-1">
          <p className="text-sm font-bold text-center self-center flex flex-row text-gray-500 uppercase whitespace-nowrap">
            {card.label}
          </p>
          <p className={`text-lg sm:text-xl text-center font-bold ${card.iconBg}`}>
            {card.valueGetter(stats)}
          </p>
        </div>
      ))}
    </div>
  </div>
);}





  