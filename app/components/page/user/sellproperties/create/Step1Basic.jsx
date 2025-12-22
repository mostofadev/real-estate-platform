export default function Step1Basic({ register, errors }) {
  return (
    <div>
      <label>Product Title</label>
      <input
        {...register("title")}
        placeholder="Product Title"
        className="border p-2 w-full mb-2"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <label>Description</label>
      <textarea
        {...register("description")}
        placeholder="Product Description"
        className="border p-2 w-full mb-2"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
    </div>
  );
}
