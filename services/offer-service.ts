import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";

async function offers(
  location:string,
  externalLink: string,
  brandName: string,
  dealType: string,
  search: string,
  category: string,
  minRating: number,
  createdFrom: string,
  createdTo: string,
  page: number,
  limit: number,
): Promise<ApiResponse<Offer[]>> {
  const rawParams = {
    location,
    externalLink,
    brandName,
    search,
    category,
    dealType,
    minRating,
    createdFrom,
    createdTo,
    page,
    limit,
  };

  // Filter out empty strings, undefined, and null values to prevent 400 Validation Errors
  const cleanParams = Object.fromEntries(
    Object.entries(rawParams).filter(([_, v]) => v !== "" && v !== undefined && v !== null)
  );

  const res: ApiResponse<Offer[]> = await apiClient.get("/offers/admin/", {
    params: cleanParams,
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
  const rawParams = {
    search,
    category,
    minRating,
    createdFrom,
    createdTo,
    page,
    limit,
  };

  const cleanParams = Object.fromEntries(
    Object.entries(rawParams).filter(([_, v]) => v !== "" && v !== undefined && v !== null)
  );

  const res: ApiResponse<Offer[]> = await apiClient.get(`/offers/user/${id}`, {
    params: cleanParams,
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
