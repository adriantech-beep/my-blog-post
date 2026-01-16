import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserPost } from "./useUpdateUserPost";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import PostCreationFields from "../features/postCreation/PostCreationFields";
import { Button } from "../components/ui/button";

import type { Post } from "../types/post";
import { updatePostSchema, type UpdatePostSchema } from "./updatePostSchema";

type EditPostModalProps = {
  post: Post;
  onClose: () => void;
};

const EditPostModal = ({ post, onClose }: EditPostModalProps) => {
  const { updatePost, isPending } = useUpdateUserPost();

  const form = useForm<UpdatePostSchema>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
      excerpt: post.excerpt ?? "",
      tags: post.tags ?? "",
      featuredImage: post.featured_image ?? "",
    },
  });

  const onSubmit = (data: UpdatePostSchema) => {
    updatePost(
      { id: post.id, ...data },
      {
        onSuccess: onClose,
      }
    );
  };

  return (
    <FormProvider {...form}>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Edit: {post.title}</CardTitle>
          <CardDescription>
            Update the details below and save your changes.
          </CardDescription>
          <CardAction />
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <PostCreationFields />

            <CardFooter className="flex-col gap-2 px-0">
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save Post"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

export default EditPostModal;
