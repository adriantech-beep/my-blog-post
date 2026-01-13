import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import type { BlogPostFormSchema } from "./postCreationSchema";

type FieldConfig = {
  name: keyof BlogPostFormSchema;
  placeholder: string;
  type: string;
  options?: { label: string; value: string }[];
};

const postInfoFields: FieldConfig[] = [
  {
    name: "title",
    placeholder: "Enter post title",
    type: "text",
  },
  {
    name: "slug",
    placeholder: "auto-generated-from-title",
    type: "text",
  },
  {
    name: "excerpt",
    placeholder: "Short summary of the post (optional)",
    type: "textarea",
  },
  {
    name: "content",
    placeholder: "Write your blog content here...",
    type: "textarea",
  },
  {
    name: "featuredImage",
    placeholder: "Paste featured image URL (optional)",
    type: "text",
  },
  {
    name: "tags",
    placeholder: "e.g. nextjs, react, tailwind",
    type: "tags",
  },
  {
    name: "status",
    placeholder: "Select status",
    type: "select",
    options: [
      { label: "Draft", value: "draft" },
      { label: "Published", value: "published" },
    ],
  },
];

const PostCreationFields = () => {
  const { control } = useFormContext<BlogPostFormSchema>();

  return (
    <div>
      {postInfoFields.map(({ name, placeholder, type }) => (
        <FormField
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl className="mt-5">
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  value={(field.value as string | undefined) ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage className="text-red-500 font-sans text-sm mt-0" />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};

export default PostCreationFields;
