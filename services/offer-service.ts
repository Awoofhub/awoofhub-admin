import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";


async function offers(search: string, dealType:string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number,): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get("/offers/admin/", {
    params: { search, dealType, category, minRating, createdFrom, createdTo, page, limit, },
  });

  return res;
}

async function offersByUsername(username: string, search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number,): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get(`/offers/username/${username}`, {
    params: { search, category, minRating, createdFrom, createdTo, page, limit },
  });

  return res;
}

async function offerById(id: string): Promise<ApiResponse<Offer>> {
  const res: ApiResponse<Offer> = await apiClient.get(`/offers/${id}`);

  return res;
}

const OfferService = {
  offers,
  offersByUsername,
  offerById,
};

export default OfferService;
