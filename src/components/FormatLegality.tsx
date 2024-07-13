export default function FormatLegality({
  valid,
  format,
}: {
  valid: boolean;
  format: string;
}) {
  return (
    <section className="grid grid-cols-3 gap-2">
      <div
        className={`col-start-1 col-end-2 rounded p-2 text-center text-xs uppercase text-white ${valid ? "bg-green-500" : "bg-gray-500"}`}
      >
        {valid ? "Legal" : "Not Legal"}
      </div>
      <div className="col-start-2 col-end-4 flex items-center">{format}</div>
    </section>
  );
}
