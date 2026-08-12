import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";

<<<<<<< HEAD
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
=======
async function offers(search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number,): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get("/offers/admin/", {
    params: { search, category, minRating, createdFrom, createdTo, page, limit, },
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
  });

  return res;
}

<<<<<<< HEAD
async function offersByUser(
    location:string,
  externalLink: string,
  brandName: string,
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
    location,
    externalLink,
    brandName,
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
=======
async function offersByUsername(username: string, search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number,): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get(`/offers/username/${username}`, {
    params: { search, category, minRating, createdFrom, createdTo, page, limit },
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
  });

  return res;
}

async function offerById(id: string): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.get(`/offers/${id}`);

  return res;
}

<<<<<<< HEAD
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

async function expiring(
  search: string,
  category: string,
  dealType: string,
  minRating: number,
  createdFrom: string,
  createdTo: string,
  page: number,
  limit: number,
): Promise<ApiResponse<Offer[]>> {
  const params: Record<string, any> = { page, limit };
  if (search) params.search = search;
  if (category) params.category = category;
  if (dealType) params.dealType = dealType;
  if (minRating) params.minRating = minRating;
  if (createdFrom) params.createdFrom = createdFrom;
  if (createdTo) params.createdTo = createdTo;

  const res: ApiResponse<Offer[]> = await apiClient.get("/offers/expiring/", {
    params,
  });

  return res;
}

=======
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
const OfferService = {
  offers,
  offersByUsername,
  offerById,
<<<<<<< HEAD
  offersByCategory,
  deleteOffer,
  moderateOffer,
  expiring,
=======
>>>>>>> f07c862dc9c084da96367328113a39dc67211a2b
};

export default OfferService;
