export type UserPost = {
  id: string;
  title: string;
  body: string;
  excerpt?: string | null;
  tags?: string | null;
  featured_image?: string | null;
  user_name: string;
  user_id: string;
  created_at: string;
};
