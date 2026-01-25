import { FormProvider, useForm, useWatch } from "react-hook-form";
import { CommentSchema } from "./commentSchema";
import CommentField from "./CommentField";
import { useCreateComment } from "./useCreateComment";
import { Post } from "@/types/post";
import { useUser } from "@/features/authentication/useUser";
import { useEffect, useMemo } from "react";
import { CircleMinus, Send } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AllCommentsModalProps = {
  post: Post;
};

const CommentForm = ({ post }: AllCommentsModalProps) => {
  const { user } = useUser();
  const { createComment, isSuccess, isPending } = useCreateComment();

  const form = useForm<CommentSchema>({
    defaultValues: {
      comment: "",
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

  const onSubmit = (data: CommentSchema) => {
    if (!post?.id || !user?.id) return;

    createComment({
      ...data,
      post_id: post.id,
      user_id: user.id,
      user_name: user.identities?.[0]?.identity_data?.userName ?? "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset({
        comment: "",
        image: undefined,
      });
    }
  }, [isSuccess, form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {image && (
          <div className="mt-3 flex items-end justify-end relative">
            <div className="max-w-24 p-2">
              <div className="flex items-end justify-end absolute top-0 right-0 ">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => form.setValue("image", undefined)}
                >
                  <CircleMinus />
                </button>
              </div>
              <img
                src={previewUrl ?? ""}
                alt="Comment attachment"
                className="max-h-30 w-auto rounded-md border object-cover "
                loading="lazy"
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between w-full ">
          <CommentField />

          <CardFooter>
            <Button
              disabled={isPending}
              className="flex items-center justify-center"
            >
              <Send />
            </Button>
          </CardFooter>
        </div>
      </form>
    </FormProvider>
  );
};

export default CommentForm;
