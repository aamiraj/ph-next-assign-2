interface TVariants {
  type: string;
  value: string;
}

export interface TProduct {
  name: string;
  description?: string;
  price: number;
  category: string;
  tags?: Array<string>;
  variants?: Array<TVariants>;
  inventory: {
    quantity: number;
    inStock: boolean;
  };
}
