import Button from "@/_lib/button/Button";
import FieldContainer from "@/_lib/form/fields/FieldContainer";
import LibraryItem from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/LibraryItem";
import {
  searchImage,
  UploadMediaResult,
} from "@/blog/[slug]/admin/_lib/form/fields/contentEditor/toolbar/image/actions";
import { useState } from "react";
import { useForm } from "react-hook-form";

type MediaLibrarySearchFormValues = {
  name: string;
};

export default function Library({
  onSelect,
}: {
  onSelect: (url: string) => void;
}) {
  const form = useForm<MediaLibrarySearchFormValues>();
  const [response, setResponse] = useState<UploadMediaResult[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit } = form;

  const onSubmit = async ({ name }: MediaLibrarySearchFormValues) => {
    setErrorMessage(null);

    try {
      const result = await searchImage({ keyword: name ?? "" });
      setResponse(result);
    } catch (error) {
      setResponse(null);
      setErrorMessage(error instanceof Error ? error.message : "Search failed");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-end">
        <FieldContainer label="Name">
          <input
            {...register("name")}
            className="border rounded-lg max-w-50 p-1"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void handleSubmit(onSubmit)();
              }
            }}
          />
        </FieldContainer>
        <Button onClick={() => void handleSubmit(onSubmit)()}>Search</Button>
      </div>

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}

      {response ? (
        <div className="flex max-h-80 flex-col gap-2 overflow-auto">
          {response.length ? (
            response.map((item) => (
              <LibraryItem
                key={item.media.id}
                item={item}
                onSelect={onSelect}
              />
            ))
          ) : (
            <p className="p-2 text-sm text-zinc-600">No results.</p>
          )}
        </div>
      ) : (
        <p className="p-2 text-sm text-zinc-600">No results yet.</p>
      )}
    </div>
  );
}
