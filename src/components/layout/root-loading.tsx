import { Search } from "lucide-react";
import { Skeleton } from "../common/skeleton";
import { Input } from "../ui/input";

const SectionLoading = () => {
  return (
    <div className="mb-10 md:mb-20">
      <div className="mb-6">
        <Skeleton className="h-8 w-40 rounded" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="group w-full relative overflow-hidden rounded-lg border bg-card transition-all hover:scale-105 cursor-pointer duration-300">
            <div className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="absolute left-2 top-2 z-10">
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>
            <div className="relative aspect-[16/12] overflow-hidden bg-muted">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="p-3">
              <div className="mb-2 flex items-center gap-1">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4" />
                  ))}
                </div>
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <div className="mb-2 flex items-center gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="flex-1 h-8" />
                <Skeleton className="flex-1 h-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BannerLoading = () => {
  return (
    <div className="w-full mt-2 mb-4">
      <div className="aspect-[16/5] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
    </div>
  );
};

export const RootPageLoading = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="h-16 container mx-auto flex items-center w-full px-1 md:px-0 justify-between">
        <Skeleton className="w-40 h-10" />

        <div className="w-full hidden md:block max-w-xl mx-auto relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for Products..."
              className="pl-3 pr-9 py-1.5 h-10 md:h-11 text-base rounded-md w-full text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            />
            <div className="absolute bg-black right-0 top-1/2 -translate-y-1/2 h-full border border-black w-14 rounded-r-md">
              <button
                key="search"
                className="w-full h-full flex items-center justify-center cursor-pointer">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Skeleton className="w-24 h-9 md:h-10 rounded-lg" />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="size-9 md:size-10 rounded-full" />
          ))}
        </div>
      </header>

      <section className="flex-1 flex gap-0 md:gap-4 overflow-hidden bg-background">
        <aside className="hidden md:flex flex-col w-80 fixed z-40 h-full left-0 bg-gray-50 border-r">
          <div className="w-full h-full flex flex-col">
            <div className="grid grid-cols-2 gap-1">
              {Array.from({ length: 16 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="col-span-1 h-28 rounded-none"
                />
              ))}
            </div>
          </div>
        </aside>

        <main className={`flex-1 overflow-y-auto ml-0 md:ml-80 bg-white`}>
          <section className="container mx-auto">
            <section className="flex flex-col gap-10 md:gap-20">
              <BannerLoading />

              <SectionLoading />
              <BannerLoading />
              <SectionLoading />
              <SectionLoading />
              <SectionLoading />
              <SectionLoading />
              <BannerLoading />
              <SectionLoading />
            </section>
          </section>
          <footer className="border-t">
            <div className="container mx-auto py-10 px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t mt-8 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <Skeleton className="h-10 w-40 mb-4 md:mb-0" />
                  <div className="flex gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-8 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </section>

      <footer className="md:hidden border-t">
        <div className="p-4">
          <div className="flex justify-around">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-6 w-6 rounded-full mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
};
