export function Dashboardskeleton() {
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

                            <div key={index} className="h-[15em] w-[25em] flex flex-row shrink relative rounded-sm bg-gray-200 dark:bg-slate-700 animate-pulse" >
                                <div className="flex flex-col justify-between absolute gap-2">

                                    <span className="h-[2em] w-[5em] rounded-3xl bg-gray-400 dark:bg-slate-500 animate-pulse mx-3 my-3" />
                                    <div className="flex item-center justify-center flex-col gap-4 mx-10">

                                        <div className="flex wrap justify-center gap-3 item-center" >
                                            <span className=" h-[4em] w-[10em] rounded-3xl top-2 bg-gray-400 dark:bg-slate-500 animate-pulse" />
                                            <span className=" h-[4em] w-[10em] rounded-3xl top-2 bg-gray-400 dark:bg-slate-500 animate-pulse" />
                                        </div>
                                        <div className="flex wrap justify-center gap-3 item-center" >
                                            <span className=" h-[4em] w-[10em] rounded-3xl top-2 bg-gray-400 dark:bg-slate-500 animate-pulse" />
                                            <span className=" h-[4em] w-[10em] rounded-3xl top-2 bg-gray-400 dark:bg-slate-500 animate-pulse" />
                                        </div>
                                    </div>


                                </div>
                            </div>

                        ))}
                    </div>
                    <div className="my-3 flex flex-row justify-center gap-[6em] mx-6">
                        {[...Array(2)].map((_, index) => (

                            <div key={index} className="h-[15em] w-[25em] flex flex-row shrink relative rounded-sm bg-gray-200 dark:bg-slate-700 animate-pulse" >
                                <div className="flex flex-col justify-between absolute gap-2">

                                    <span className="h-[2em] w-[5em] rounded-3xl bg-gray-400 dark:bg-slate-500 animate-pulse mx-3 my-3" />
                                    <div className="flex item-center justify-center flex-col gap-4 mx-10">

                                        <div className="flex wrap justify-center gap-3 item-center" >
                                            <span className=" h-[4em] w-[10em] rounded-3xl top-2 bg-gray-400 dark:bg-slate-500 animate-pulse" />
                                            <span className=" h-[4em] w-[10em] rounded-3xl top-2 bg-gray-400 dark:bg-slate-500 animate-pulse" />
                                        </div>
                                        <div className="flex wrap justify-center gap-3 item-center" >
                                            <span className=" h-[4em] w-[10em] rounded-3xl top-2 bg-gray-400 dark:bg-slate-500 animate-pulse" />
                                            <span className=" h-[4em] w-[10em] rounded-3xl top-2 bg-gray-400 dark:bg-slate-500 animate-pulse" />
                                        </div>
                                    </div>


                                </div>


                            </div>
                        ))}
                    </div>



                </div>
            </main>

        </div>
    )

}