export type Product = {
  id: String;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category: Category;
};

export enum Category {
  Shirt = 0,
  pants = 1,
  shoes = 2,
  accessories = 3,
  bags = 4,
  others = 5,
}
