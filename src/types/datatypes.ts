export type profileTypes = {
  id: string;
  username: string;
  bio: string;
  location: string;
  avatar: string;
};

export type ParamsProfileId = {
  params: Promise<{ profileId: string }>;
};
