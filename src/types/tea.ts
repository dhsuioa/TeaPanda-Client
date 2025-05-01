export interface Tag {
    color: string;
    id: string;
    name: string;
  }
  
  export interface Tea {
    averageRating: number;
    categoryId: string;
    description: string;
    id: string;
    isDeleted: boolean;
    name: string;
    note: string;
    price: number;
    rating: number;
    tags: Tag[];
  }