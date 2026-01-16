import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import type { BlogPostFormSchema } from "./postCreationSchema";
import PostCreationFields from "./PostCreationFields";
import { useUser } from "../authentication/useUser";
import { useCreatePost } from "./useCreatePost";

const PostCreationForm = () => {
  const { user, isAuthenticated } = useUser();
  const { createPost } = useCreatePost();
  const userName = user?.identities?.at(0)?.identity_data?.userName || "";
  const userId = user?.id || "";

  const form = useForm<BlogPostFormSchema>({
    defaultValues: {
      title: "",
      body: "",
      excerpt: "",
      tags: "",
      featuredImage: "",
      userName: userName,
      userId: userId,
    },
  });

  const onSubmit = (data: BlogPostFormSchema) => {
    if (!isAuthenticated) {
      return;
    }
    const { title, body, excerpt, tags, featuredImage } = data;
    createPost({ title, body, excerpt, tags, featuredImage, userName, userId });
  };

  return (
    <FormProvider {...form}>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Create Blog Post</CardTitle>
          <CardDescription>
            Fill in the details below to create a new blog post.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <PostCreationFields />

            <CardFooter className="flex-col gap-2 px-0">
              <Button type="submit" className="w-full mt-4">
                Save Post
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default PostCreationForm;
