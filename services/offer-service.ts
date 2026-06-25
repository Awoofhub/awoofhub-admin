/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";

async function offers(
  search: string = "",
  category: string = "",
  dealType: string = "",
  minRating: number = 0,
  createdFrom: string = "",
  createdTo: string = "",
  page: number = 1,
  limit: number = 10,
): Promise<ApiResponse<Offer[]>> {
  const params: any = { page, limit };

  if (search) params.search = search;
  if (category) params.category = category;
  if (dealType) params.dealType = dealType;
  if (minRating > 0) params.minRating = minRating;
  if (createdFrom) params.createdFrom = createdFrom;
  if (createdTo) params.createdTo = createdTo;

  const res: ApiResponse<Offer[]> = await apiClient.get("/offers/admin", {
    params,
  });
  return res;
}

async function offersByUser(
  id: string,
  search: string,
  category: string,
  minRating: number,
  createdFrom: string,
  createdTo: string,
  page: number,
  limit: number,
): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get(`/offers/user/${id}`, {
    params: {
      search,
      category,
      minRating,
      createdFrom,
      createdTo,
      page,
      limit,
    },
  });

  return res;
}

async function offerById(id: string): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.get(`/offers/${id}`);

  return res;
}

async function offersByCategory(
  id: string,
  page: number,
  limit: number,
): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get(
    `/offers/category/id/${id}`,
    {
      params: { page, limit },
    },
  );

  return res;
}

async function deleteOffer(id: string): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.post(`/offers/${id}`);

  return res;
}

async function moderateOffer(
  id: string,
  status: "approved" | "rejected" | "pending",
  note?: string,
): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.post(`/offers/${id}/status`, {
    status,
    note,
  });
  return res;
}

const OfferService = {
  offers,
  offersByUser,
  offerById,
  offersByCategory,
  deleteOffer,
  moderateOffer,
};

export default OfferService;
