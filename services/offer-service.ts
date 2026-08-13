import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { Offer } from "@/types/offer";

async function offers(search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number,): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get("/offers/admin/", {
    params: { search, category, minRating, createdFrom, createdTo, page, limit, },
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

async function trendingOffers(search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number,): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/trending', {
    params: { search, category, minRating, createdFrom, createdTo, page, limit },
  })

  return res;
}

async function expiringOffers(search: string, category: string, minRating: number, createdFrom: string, createdTo: string, page: number, limit: number,): Promise<ApiResponse<Offer[]>> {
  const res: ApiResponse<Offer[]> = await apiClient.get('/offers/expiring', {
    params: { search, category, minRating, createdFrom, createdTo, page, limit },
  })

  return res;
}

//temporary 
async function offersForStatusCount(): Promise<Offer[]> {
  const res: ApiResponse<Offer[]> = await apiClient.get("/offers/admin/", {
    params: { limit: 1000, page: 1 },
  });
  return res.data;
}

const OfferService = {
  offers,
  offersByUsername,
  offerById,
  trendingOffers,
  expiringOffers,
  offersForStatusCount,
};

export default OfferService;
