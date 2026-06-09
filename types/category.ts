// export interface CreateCategoryData {
//     title: string;
//     description: string;
//     category: string;
//     price?: number;
//     imageUrl?: string;
//     location?: string;
//     endDate: string;
// }

// export interface UpdateCategoryData {
//     title?: string;
//     description?: string;
//     category?: string;
//     price?: number;
//     image_url?: string;
//     location?: string;
// };

// export interface Category {
//     id: string;
//     name: string;
//     slug: string;
//     createdAt: string;
// };

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt?: string;
}
