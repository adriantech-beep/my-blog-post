import { FormProvider, useForm, useWatch } from "react-hook-form";
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
import { Button } from "../components/ui/button";

import type { Post } from "../types/post";
import { updatePostSchema, type UpdatePostSchema } from "./updatePostSchema";
import EditPostField from "./EditPostField";
import { useEffect, useMemo } from "react";
import { CircleMinus } from "lucide-react";

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
      image: undefined,
    },
  });

  const image = useWatch({
    control: form.control,
    name: "image",
  });

  const previewUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onSubmit = (data: UpdatePostSchema) => {
    updatePost(
      { id: post.id, ...data },
      {
        onSuccess: onClose,
      },
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
          {image && (
            <div className="flex items-center justify-center flex-col">
              <div className="w-full flex items-end justify-end">
                <button
                  className="cursor-pointer"
                  onClick={() => form.setValue("image", undefined)}
                >
                  <CircleMinus />
                </button>
              </div>
              <img
                src={previewUrl || ""}
                alt="Preview"
                className="mt-4 rounded-md max-h-48"
              />
            </div>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <EditPostField />

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
