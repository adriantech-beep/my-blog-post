import { Button } from "../../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
// import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import type { BlogPostFormSchema } from "./postCreationSchema";
import PostCreationFields from "./PostCreationFields";

const PostCreationForm = () => {
  //   const navigate = useNavigate();

  const form = useForm<BlogPostFormSchema>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      tags: [],
      status: "draft",
    },
  });

  const onSubmit = (data: BlogPostFormSchema) => {
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
          <CardAction>
            {/* <Button variant="link" onClick={() => navigate("/posts")}>
              Back to posts
            </Button> */}
          </CardAction>
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
