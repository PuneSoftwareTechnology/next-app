import Header from "@/components/molecules/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-red-600">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Oops! The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back to Home
        </a>
      </main>
    </>
  );
}
