export default function Step2Details({ register, errors }) {
  return (
    <div>
      <label>Category</label>
      <input
        {...register("category")}
        placeholder="Category"
        className="border p-2 w-full mb-2"
      />
      {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

      <label>Price</label>
      <input
        type="number"
        {...register("price")}
        placeholder="Price"
        className="border p-2 w-full mb-2"
      />
      {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
    </div>
  );
}
