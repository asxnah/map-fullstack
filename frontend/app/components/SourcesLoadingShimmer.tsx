export const SourcesLoadingShimmer = () => {
  return (
    <div className="grid gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="flex gap-3" key={i}>
          <div className="grow h-[40px] bg-[#dee2e6] relative rounded-xl overflow-hidden">
            <div className="absolite inset-0 h-full w-full bg-gradient-to-r from-[#dee2e6] to-[#ced4da] animate-pulse"></div>
          </div>
          <div className="bg-[#ced4da] relative overflow-hidden rounded-xl w-[40px]">
            <div className="absolite inset-0 h-full w-full bg-gradient-to-r from-[#ced4da] to-[#dee2e6] to-80% animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
