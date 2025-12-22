import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; 
const MAX_GALLERY_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Create schema - Image required
const imageFileSchema = z
  .any()
  .refine((file) => {
    if (!file) return false;
    if (file instanceof File) {
      return file.size <= MAX_IMAGE_SIZE;
    }
    return true;
  }, "Image must be less than 5MB")
  .refine((file) => {
    if (!file) return false;
    if (file instanceof File) {
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }
    return true;
  }, "Only .jpg, .jpeg, .png and .webp formats are supported");

// Update schema - Image optional
const imageFileSchemaOptional = z
  .any()
  .refine((file) => {
    if (!file) return true; // Allow empty
    if (file instanceof File) {
      return file.size <= MAX_IMAGE_SIZE;
    }
    return true;
  }, "Image must be less than 5MB")
  .refine((file) => {
    if (!file) return true; // Allow empty
    if (file instanceof File) {
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }
    return true;
  }, "Only .jpg, .jpeg, .png and .webp formats are supported")
  .optional();

const galleryFilesSchema = z
  .any()
  .refine((files) => {
    if (!files) return true;
    if (Array.isArray(files)) {
      return files.every(
        (file) => file instanceof File && file.size <= MAX_GALLERY_SIZE
      );
    }
    return true;
  }, "Each gallery image must be less than 5MB")
  .refine((files) => {
    if (!files) return true;
    if (Array.isArray(files)) {
      return files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
    }
    return true;
  }, "Gallery images must be .jpg, .jpeg, .png or .webp")
  .optional();

// Create Schemas (Image required)
export const PropertiesSchemas = [
  z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    price: z.number().min(1, "Price is required"),
    bedrooms: z.number().min(0, "Bedrooms required").optional(),
    bathrooms: z.number().min(0, "Bathrooms required").optional(),
    area_sqft: z.number().min(0, "Area is required").optional(),
    years_build: z.number().min(1800, "Year built is required").optional(),
    land_area: z.number().min(0, "Land area is required").optional(),
    garages: z.number().min(0, "Garages is required").optional(),
    garage_size: z.number().min(0, "Garage size is required").optional(),
  }),

  z.object({
    country_id: z.string().min(1, "Country is required"),
    division_id: z.string().min(1, "Division is required"),
    district_id: z.string().min(1, "District is required"),
    sub_district_id: z.string().min(1, "Sub District is required"),
    full_location: z.string().min(5, "Full location is required"),
    google_map: z.string().optional(),
    category_id: z.string().min(1, "Category is required"),
    property_type_id: z.string().min(1, "Property type is required"),
  }),

  z.object({
    is_featured: z.boolean().optional(),
    status: z.boolean().optional(),
    image_url: imageFileSchema,
    video_url: z.string().url("Invalid URL").optional().or(z.literal("")),
    image_gallery: galleryFilesSchema,
    features: z.array(z.number()).min(1, "At least one feature is required"),
  }),

  z.object({
    latitude: z.number().min(-90).max(90, "Invalid latitude"),
    longitude: z.number().min(-180).max(180, "Invalid longitude"),
  }),
];

// Update Schemas (Image optional)
export const PropertiesUpdateSchemas = [
  z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    price: z.number().min(1, "Price is required"),
    bedrooms: z.number().min(0, "Bedrooms required").optional(),
    bathrooms: z.number().min(0, "Bathrooms required").optional(),
    area_sqft: z.number().min(0, "Area is required").optional(),
    years_build: z.number().min(1800, "Year built is required").optional(),
    land_area: z.number().min(0, "Land area is required").optional(),
    garages: z.number().min(0, "Garages is required").optional(),
    garage_size: z.number().min(0, "Garage size is required").optional(),
  }),

  z.object({
    country_id: z.string().min(1, "Country is required"),
    division_id: z.string().min(1, "Division is required"),
    district_id: z.string().min(1, "District is required"),
    sub_district_id: z.string().min(1, "Sub District is required"),
    full_location: z.string().min(5, "Full location is required"),
    google_map: z.string().optional(),
    category_id: z.string().min(1, "Category is required"),
    property_type_id: z.string().min(1, "Property type is required"),
  }),

  z.object({
    is_featured: z.boolean().optional(),
    status: z.boolean().optional(),
    image_url: imageFileSchemaOptional, // Optional for update
    video_url: z.string().url("Invalid URL").optional().or(z.literal("")),
    image_gallery: galleryFilesSchema, // Optional
    features: z.array(z.number()).min(1, "At least one feature is required"),
  }),

  z.object({
    latitude: z.number().min(-90).max(90, "Invalid latitude"),
    longitude: z.number().min(-180).max(180, "Invalid longitude"),
  }),
];

// Full schemas
export const fullSchema = PropertiesSchemas.reduce((acc, schema) =>
  acc.merge(schema)
);

export const fullUpdateSchema = PropertiesUpdateSchemas.reduce((acc, schema) =>
  acc.merge(schema)
);