import { useAdminPorpertyDataFeatures } from "@/app/hooks/useAdminPropertyData";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export default function PropertyFeaturesSelector({
  control,
  errors,
}) {
  const { data } = useAdminPorpertyDataFeatures();
  const features = data?.features || [];

  return (
    <div className="space-y-2 mt-4">
      <label className="block text-gray-800 font-medium">
        Property Features <span className="text-red-500">*</span>
      </label>

      <Controller
        name="features"
        control={control}
        defaultValue={[]}
        rules={{
          validate: (value) =>
            value && value.length > 0 ? true : "Please select at least one feature"
        }}
        render={({ field }) => (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {features.map((feature) => {
              const isChecked = field.value?.includes(feature.id) || false;
              
              return (
                <label
                  key={feature.id}
                  className={`flex items-center gap-2 border p-2 rounded cursor-pointer transition-all ${
                    isChecked
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={feature.id}
                    checked={isChecked}
                    onChange={(e) => {
                      const featureId = parseInt(e.target.value);
                      const currentValue = field.value || [];
                      
                      const newValue = e.target.checked
                        ? [...currentValue, featureId]
                        : currentValue.filter((id) => id !== featureId);
                      
                      field.onChange(newValue);
                      console.log("Features selected:", newValue);
                    }}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm">{feature.name}</span>
                </label>
              );
            })}
          </div>
        )}
      />

      {errors?.features && (
        <p className="text-red-500 text-sm mt-1">
          {typeof errors.features === "string"
            ? errors.features
            : errors.features.message || errors.features[0]}
        </p>
      )}
    </div>
  );
}