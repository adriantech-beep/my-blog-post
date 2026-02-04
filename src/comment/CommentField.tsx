import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { CommentSchema } from "./commentSchema";
import { ImagePlus } from "lucide-react";

type FieldConfig = {
  name: keyof CommentSchema;
  placeholder: string;
  type: string;
  options?: { label: string; value: string }[];
};

const postInfoFields: FieldConfig[] = [
  {
    name: "comment",
    placeholder: "Enter your comment",
    type: "text",
  },
];

const CommentField = () => {
  const { control } = useFormContext<CommentSchema>();

  return (
    <div className="flex items-center justify-center  gap-4 ">
      <FormField
        control={control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  autoFocus
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />

                <label
                  htmlFor="image-upload"
                  className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-md border border-dashed p-4 hover:bg-muted transition"
                >
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                </label>
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <div className="w-60">
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
    </div>
  );
};

export default CommentField;
