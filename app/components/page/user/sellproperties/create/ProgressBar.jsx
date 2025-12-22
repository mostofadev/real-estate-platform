export default function ProgressBar({ step }) {
  const steps = [1, 2, 3, 4,5];
  return (
    <div className="flex gap-2 mb-4">
      {steps.map(s => (
        <div
          key={s}
          className={`flex-1 h-2 rounded ${s <= step ? "bg-[var(--primary-color)]" : "bg-gray-300"}`}
        ></div>
      ))}
    </div>
  );
}
