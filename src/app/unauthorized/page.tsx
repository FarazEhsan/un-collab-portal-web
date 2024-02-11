import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <>
            <main className="grid min-h-full place-items-center bg-white dark:bg-gray-950 px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-custom-blue">401</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">Unauthorized</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">Sorry, you are not allowed to access the page you’re looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            href="/home"
                            className="rounded-md bg-custom-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-custom-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </Link>
                        {/*<a href="#" className="text-sm font-semibold text-gray-900">*/}
                        {/*    Contact support <span aria-hidden="true">&rarr;</span>*/}
                        {/*</a>*/}
                    </div>
                </div>
            </main>
        </>
    )
}
