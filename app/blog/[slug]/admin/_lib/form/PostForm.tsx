"use client";

import { FormProvider, useForm } from "react-hook-form";
import ContentEditorField from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/ContentEditorField";
import DescriptionField from "@/blog/[slug]/admin/_lib/form/fields/DescriptionField";
import SlugField from "@/blog/[slug]/admin/_lib/form/fields/SlugField";
import TitleField from "@/blog/[slug]/admin/_lib/form/fields/TitleField";
import { Tables } from "@/blog/_lib/supabase/database";
import {
  postFormSchema,
  PostFormValues,
} from "@/blog/[slug]/admin/_lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost, updatePost } from "@/blog/[slug]/admin/_lib/actions";
import PublishField from "@/blog/[slug]/admin/_lib/form/fields/PublishField";
import TagsField from "@/blog/[slug]/admin/_lib/form/fields/tags/TagsField";
import Button from "@/_lib/button/Button";

export default function PostForm({
  post,
  slug,
  tags,
}: {
  post: Tables<"posts"> | null;
  slug: Tables<"posts">["slug"];
  tags: Tables<"tags">[];
}) {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      slug,
      title: post?.title ?? "",
      description: post?.description ?? "",
      content: typeof post?.content === "string" ? post.content : "",
      isPublished: !!post?.published_at,
      tagIds: tags.map(({ id }) => id),
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (formValues: PostFormValues) =>
    post ? updatePost(post, formValues) : createPost(formValues);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-1"
      >
        <SlugField />
        <TitleField />
        <DescriptionField />
        <ContentEditorField />
        <TagsField tags={tags} />
        <PublishField publishedAt={post?.published_at} />
        <div className="sticky bottom-0 relative p-2 before:absolute before:inset-y-0 before:left-1/2 before:w-screen before:-translate-x-1/2 before:bg-gray-100/95 before:backdrop-blur before:content-['']">
          <Button
            type="submit"
            primary
            disabled={isSubmitting}
            className="relative z-10 w-full"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
