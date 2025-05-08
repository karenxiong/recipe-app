function Chip({ name }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border px-2 py-1 text-xs md:text-sm font-semibold text-coral w-fit`}
    >
      {name}
    </div>
  );
}
export default Chip;