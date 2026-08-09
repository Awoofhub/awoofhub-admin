// app/(main)/all-offers/page.tsx
"use client";

import { AllOffersPage } from "@/components/offers/admin/AllOffers";
import { useAllOffersAdmin } from "@/features/offers/useAllOffersAdmin";
import OfferService from "@/services/offer-service";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function AllOffersRoutePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useAllOffersAdmin();

  const handleView = (offerId: string) => {
    router.push(`/offers/${offerId}`); // adjust to your real detail route
  };

  const handleDelete = async (offerId: string) => {
    await OfferService.deleteOffer(offerId);
    queryClient.invalidateQueries({ queryKey: ["all-offers-admin"] });
  };

  const handleApprove = async (offerId: string) => {
    await OfferService.moderateOffer(offerId, "approved");
    queryClient.invalidateQueries({ queryKey: ["all-offers-admin"] });
  };

  const handleReject = async (offerId: string) => {
    await OfferService.moderateOffer(offerId, "rejected");
    queryClient.invalidateQueries({ queryKey: ["all-offers-admin"] });
  };

  if (error) {
    return <div className="p-6 text-red-600">Failed to load offers.</div>;
  }

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading…</div>;
  }

  return (
    <AllOffersPage
      offers={data.offers}
      stats={data.stats}
      onView={handleView}
      onDelete={handleDelete}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}