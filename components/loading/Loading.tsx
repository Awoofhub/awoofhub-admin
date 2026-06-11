export default function FullLoading() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:flex md:gap-6">
      <aside className="hidden min-[1200px]:flex flex-col gap-4 w-50 min-h-screen rounded-3xl bg-primary/5 p-4">
        <div className="h-12 w-full rounded-[28px] bg-gray-200 dark:bg-slate-700 animate-pulse" />
        <div className="space-y-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-10 w-full rounded-2xl bg-gray-200 dark:bg-slate-700 animate-pulse" />
          ))}
        </div>
      </aside>

     <main className="flex-1">
        <div className="space-y-6 ">
          
          <div className="flex flex-row justify-between gap-5 mx-6">
          <div className="h-14 w-[25%] max-w-4xl rounded-3xl bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-14 w-[60%] max-w-4xl rounded-3xl bg-gray-200 dark:bg-slate-700 animate-pulse" />

          </div>
          <div className="h-14 w-[15%] max-w-4xl rounded-3xl bg-gray-200 dark:bg-slate-700 animate-pulse mx-6" />

          <div className="space-y-3 flex flex-row justify-center gap-[6em] mx-6">
            {[...Array(2)].map((_, index) => (
              
              <div key={index} className="h-[15em] w-[25em] flex flex-row shrink relative rounded-sm bg-gray-200 dark:bg-slate-700 animate-pulse"/>

            ))}
          </div>
          <div className="my-3 flex flex-row justify-center gap-[6em] mx-6">
            {[...Array(2)].map((_, index) => (
              
              <div key={index} className="h-[15em] w-[25em] flex flex-row shrink relative rounded-sm bg-gray-200 dark:bg-slate-700 animate-pulse"/>

            ))}
          </div>
          


        </div>
      </main>
    </div>
  )
}

export function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:flex md:gap-6">
      <main className="flex-1">
        <div className="space-y-6 ">
          
          <div className="flex flex-row justify-between gap-5 mx-6">
          <div className="h-14 w-[25%] max-w-4xl rounded-3xl bg-gray-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-14 w-[60%] max-w-4xl rounded-3xl bg-gray-200 dark:bg-slate-700 animate-pulse" />

          </div>
          <div className="h-14 w-[15%] max-w-4xl rounded-3xl bg-gray-200 dark:bg-slate-700 animate-pulse mx-6" />

          <div className="space-y-3 flex flex-row justify-center gap-[6em] mx-6">
            {[...Array(2)].map((_, index) => (
              
              <div key={index} className="h-[15em] w-[25em] flex flex-row shrink relative rounded-sm bg-gray-200 dark:bg-slate-700 animate-pulse"/>

            ))}
          </div>
          <div className="my-3 flex flex-row justify-center gap-[6em] mx-6">
            {[...Array(2)].map((_, index) => (
              
              <div key={index} className="h-[15em] w-[25em] flex flex-row shrink relative rounded-sm bg-gray-200 dark:bg-slate-700 animate-pulse"/>

            ))}
          </div>
          


        </div>
      </main>

    </div>
  )

}
