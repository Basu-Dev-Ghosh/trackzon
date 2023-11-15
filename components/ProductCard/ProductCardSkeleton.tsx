import { Skeleton } from "../ui/skeleton";
const ProductCardSkelton = () => {
  return (
    <div className="relative m-6 h-[480px] flex w-full max-w-xs flex-col overflow-hidden rounded-lg border bg-white border-white dark:border-[#001427] dark:bg-[#001427] shadow-md">
      <div className="w-full p-10 flex justify-center items-center">
        <Skeleton className="h-[170px] w-[90%] text-center" />
      </div>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl space-y-2 tracking-tight text-slate-900 dark:text-white">
            <Skeleton className="h-2 w-[200px]" />
            <Skeleton className="h-2 w-[150px]" />
            <Skeleton className="h-2 w-[100px]" />
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl space-y-2 font-bold text-slate-900 dark:text-white">
              <Skeleton className="h-2 w-[50px]" />
              <Skeleton className="h-2 w-[30px]" />
            </span>
          </p>
          <div className="flex items-start max-w-[100px] flex-col">
            <span className="mr-2 rounded bg-blue-300 px-2.5 py-0.5 text-xs font-semibold">
              <Skeleton className="h-3 w-[20px]" />
            </span>
          </div>
        </div>
        <div className="py-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full mt-2" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkelton;
