import FieldContainer from "@/_lib/form/fields/FieldContainer";
import { create } from "@/blog/[slug]/admin/_lib/form/fields/tags/mutations";
import { index } from "@/blog/[slug]/admin/_lib/form/fields/tags/queries";
import { PostFormValues } from "@/blog/[slug]/admin/_lib/schema";
import { Tables } from "@/blog/_lib/supabase/database";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ActionMeta, MultiValue, StylesConfig } from "react-select";
import makeAnimated from "react-select/animated";
import AsyncCreatableSelect from "react-select/async-creatable";

type TagOption = {
  label: string;
  value: number;
};

const animatedComponents = makeAnimated();

const selectStyles: StylesConfig<TagOption, true> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "var(--surface)",
    borderColor: state.isFocused ? "var(--accent)" : "var(--border)",
    boxShadow: state.isFocused ? "0 0 0 1px var(--accent)" : "none",
    color: "var(--foreground)",
    ":hover": {
      borderColor: "var(--accent)",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--surface-strong)",
    border: "1px solid var(--border)",
    boxShadow: "0 24px 80px rgba(15,23,42,0.16)",
    overflow: "hidden",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "var(--accent)"
      : state.isFocused
        ? "color-mix(in srgb, var(--accent) 12%, var(--surface-strong))"
        : "var(--surface-strong)",
    color: state.isSelected ? "#ffffff" : "var(--foreground)",
    ":active": {
      backgroundColor: "color-mix(in srgb, var(--accent) 20%, var(--surface-strong))",
    },
  }),
  input: (base) => ({
    ...base,
    color: "var(--foreground)",
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--foreground)",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "color-mix(in srgb, var(--accent) 14%, var(--surface))",
    border: "1px solid color-mix(in srgb, var(--accent) 28%, var(--border))",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "var(--foreground)",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "var(--muted)",
    ":hover": {
      backgroundColor: "transparent",
      color: "var(--foreground)",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--muted)",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "var(--muted)",
    ":hover": {
      color: "var(--foreground)",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "var(--muted)",
    ":hover": {
      color: "var(--foreground)",
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "var(--border)",
  }),
  loadingMessage: (base) => ({
    ...base,
    color: "var(--muted)",
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "var(--muted)",
  }),
};

const loadOptions = async ({
  searchStr,
}: {
  searchStr?: string;
} = {}) => {
  const tags = await index({ searchStr });
  return tags.map(({ id, name }) => ({ label: name, value: id }));
};

export default function TagsField({ tags }: { tags: Tables<"tags">[] }) {
  const { setValue } = useFormContext<PostFormValues>();
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
        styles={selectStyles}
        onCreateOption={handleCreate}
        options={options}
        value={selected}
        onChange={handleChange}
        isLoading={!options}
        loadOptions={(searchStr) => loadOptions({ searchStr })}
        defaultOptions={options}
        instanceId="tags"
      />
    </FieldContainer>
  );
}
