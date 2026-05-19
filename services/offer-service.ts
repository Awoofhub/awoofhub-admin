import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";

async function offers(
  search: string,
  category: string,
  minRating: number,
  createdFrom: string,
  createdTo: string,
  page: number,
  limit: number,
): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get("/offers/", {
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
  status: "approved" | "rejected",
  adminNote?: string,
): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.patch(
    `/offers/${id}/moderate`,
    {
      status,
      adminNote,
    },
  );
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
