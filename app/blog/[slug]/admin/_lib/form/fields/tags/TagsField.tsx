import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { create } from "@/blog/[slug]/admin/_lib/form/fields/tags/mutations";
import { index } from "@/blog/[slug]/admin/_lib/form/fields/tags/queries";
import { PostFormValues } from "@/blog/[slug]/admin/_lib/schema";
import { Tables } from "@/blog/_lib/supabase/database";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ActionMeta, MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import AsyncCreatableSelect from "react-select/async-creatable";

type TagOption = {
  label: string;
  value: number;
};

const animatedComponents = makeAnimated();

const loadOptions = async ({
  searchStr,
}: {
  searchStr?: string;
} = {}) => {
  const tags = await index({ searchStr });
  return tags.map(({ id, name }) => ({ label: name, value: id }));
};

export default function TagsField({ tags }: { tags: Tables<"tags">[] }) {
  const { watch, setValue } = useFormContext<PostFormValues>();
  const tagIds = watch("tagIds");
  console.log(tagIds);
  const [options, setOptions] = useState<TagOption[]>();
  const [selected, setSelected] = useState<TagOption[]>(
    tags.map(({ id, name }) => ({ label: name, value: id })),
  );

  const populateOptions = useCallback(
    (searchStr?: string) => {
      if (options) return;
      loadOptions({ searchStr }).then((result) => setOptions(result));
    },
    [options],
  );

  useEffect(() => {
    populateOptions();
  }, [populateOptions]);

  const handleChange = (
    newValue: MultiValue<TagOption>,
    actionMeta: ActionMeta<TagOption>,
  ) => {
    switch (actionMeta.action) {
      case "clear":
        setSelected([]);
        setValue("tagIds", []);
        populateOptions();
        break;
      case "remove-value":
      case "select-option":
        setSelected([...newValue]);
        setValue(
          "tagIds",
          newValue.map(({ value }) => value),
        );
        break;
    }
  };

  const handleCreate = async (name: string) => {
    const { id } = await create(name);
    const newValue = [...selected, { label: name, value: id }].sort((a, b) =>
      a.label.localeCompare(b.label),
    );
    setSelected(newValue);
    setValue(
      "tagIds",
      newValue.map(({ value }) => value),
    );
    populateOptions();
  };

  return (
    <FieldContainer label="Tags">
      <AsyncCreatableSelect
        isMulti
        closeMenuOnSelect={false}
        components={animatedComponents}
        onCreateOption={handleCreate}
        options={options}
        value={selected}
        onChange={handleChange}
        isLoading={!options}
        loadOptions={(searchStr) => loadOptions({ searchStr })}
        defaultOptions={options}
      />
    </FieldContainer>
  );
}
