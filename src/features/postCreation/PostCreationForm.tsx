import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import type { BlogPostFormSchema } from "./postCreationSchema";
import PostCreationFields from "./PostCreationFields";
import { useUser } from "../authentication/useUser";
import { useCreatePost } from "./useCreatePost";
import { useEffect, useMemo } from "react";

const PostCreationForm = () => {
  const { user, isAuthenticated } = useUser();
  const { createPost, isPending } = useCreatePost();
  const userName = user?.identities?.at(0)?.identity_data?.userName || "";
  const userId = user?.id || "";

  const form = useForm<BlogPostFormSchema>({
    defaultValues: {
      title: "",
      body: "",
      image: undefined,
      userName: userName,
      userId: userId,
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

  const onSubmit = (data: BlogPostFormSchema) => {
    if (!isAuthenticated) {
      return;
    }
    const { title, body, image } = data;
    createPost({ title, body, image, userName, userId });

    console.log(data);
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
            {image && (
              <div>
                <button onClick={() => form.setValue("image", undefined)}>
                  X
                </button>
                <img
                  src={previewUrl || ""}
                  alt="Preview"
                  className="mt-4 rounded-md max-h-48"
                />
              </div>
            )}
            <PostCreationFields />

            <CardFooter className="flex-col gap-2 px-0">
              <Button
                disabled={isPending}
                type="submit"
                className="w-full mt-4"
              >
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
