export type profileTypes = {
  id: string;
  username: string;
  bio: string;
  location: string;
  avatar: string;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
  rating: string;
};

export type ParamsProfileId = {
  params: Promise<{ profileId: string }>;
};
