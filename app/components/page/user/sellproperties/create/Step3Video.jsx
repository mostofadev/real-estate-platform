export default function Step3Video({ setValue, values }) {
  const handleFileChange = e => setValue("video", e.target.files[0]);

  return (
    <div>
      <label>Upload Video (Optional)</label>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="border p-2 w-full mb-2"
      />
      {values.video && <p className="text-green-600">Selected: {values.video.name}</p>}
    </div>
  );
}
