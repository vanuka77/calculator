import { QueryClient } from "react-query";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [url] = queryKey;
        const response = await fetch(`/v1/api${url}`, {
          mode: "no-cors",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      },
    },
  },
});
