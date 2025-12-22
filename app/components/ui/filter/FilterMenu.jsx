"use client";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import PrimaryButton from "../button/Primary";
import { usePropertyQuery } from "@/app/hooks/usePropertyQuery";
import TextInput from "../formAction/TextInput";
import SelectInput from "../formAction/SeleteInput";
import PageLoading from "../loader/PageLoading";

export default function FilterMenu() {
  const router = useRouter();
  const { data: responseData, isLoading } = usePropertyQuery();
  const types = responseData?.data?.types ?? [];
  const categories = responseData?.data?.categories ?? [];

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      location: "",
      property_type_id: "",
      category_id: "",
      price_min: "",
      price_max: "",
    },
  });

  const onSubmit = (formData) => {
    const query = new URLSearchParams();
    if (formData.location) query.append("location", formData.location);
    if (formData.property_type_id)
      query.append("property_type_id", formData.property_type_id);
    if (formData.category_id) query.append("category_id", formData.category_id);
    if (formData.price_min) query.append("price_min", formData.price_min);
    if (formData.price_max) query.append("price_max", formData.price_max);

    router.push(`/find?${query.toString()}`);
  };

  if (isLoading) return <PageLoading />;

  return (
    <div className="bg-[var(--bg-one)] rounded-lg  border border-gray-200 px-5 py-6 shadow-sm mt-6 w-full mx-12 flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="flex flex-col lg:flex-row justify-center items-center lg:flex-wrap gap-4 w-full ">
          {/* Location */}
          <li className="flex-1 w-full">
            <TextInput
              MarginB={false}
              type="text"
              {...register("location")}
              placeholder="Location"
              className="w-full"
            />
          </li>

          {/* Price Min */}
          <li className="flex-1 hidden w-full lg:block">
            <TextInput
              type="number"
               MarginB={false}
              {...register("price_min")}
              placeholder="Min Price"
              className="w-full"
            />
          </li>

          {/* Price Max */}
          <li className="flex-1 hidden w-full lg:block">
            <TextInput
              type="number"
               MarginB={false}
              {...register("price_max")}
              placeholder="Max Price"
              className="w-full"
            />
          </li>

          {/* Property Type */}
          <li className="flex-1 w-full">
            <Controller
              control={control}
              name="property_type_id"
              render={({ field }) => (
                <SelectInput
                  {...field}
                  options={types.map((t) => ({ value: t.id, label: t.name }))}
                  className="w-full"
                />
              )}
            />
          </li>

          {/* Category */}
          <li className="flex-1 w-full">
            <Controller
              control={control}
              name="category_id"
              render={({ field }) => (
                <SelectInput
                  {...field}
                  options={categories.map((c) => ({ value: c.id, label: c.name }))}
                  className="w-full"
                />
              )}
            />
          </li>

          {/* Submit Button */}
          <li className="flex-1">
            <PrimaryButton type="submit" className="w-full text-center">
              Search
            </PrimaryButton>
          </li>
        </ul>
      </form>
    </div>
  );
}
