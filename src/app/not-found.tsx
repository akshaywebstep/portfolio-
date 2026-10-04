import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-slate-800 p-4">
      <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      <p className="mt-2 text-slate-600">The requested resource could not be found.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
        Return Home
      </Link>
    </div>
  );
}
