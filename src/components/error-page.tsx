import { useNavigate } from "react-router-dom";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Button } from "./ui/button";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Something went wrong</h1>
      {isRouteErrorResponse(error) ? (
        <>
          <p className="text-lg">Status: {error.status}</p>
          <p className="text-gray-700">{error.statusText}</p>
        </>
      ) : (
        <p className="text-gray-700">{(error as Error).message || "Unknown error"}</p>
      )}
      <Button
        onClick={() => navigate('/')}
        className="mt-4 px-4 py-2  transition duration-200"
      >
        Home
      </Button>
    </div>
  );
}
