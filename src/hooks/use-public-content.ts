import { useQuery } from "@tanstack/react-query";
import { getPublicContent } from "@/lib/api";
import { defaultPublicContent } from "@/lib/default-content";

export const usePublicContent = () =>
  useQuery({
    queryKey: ["public-content"],
    queryFn: async () => {
      try {
        return await getPublicContent();
      } catch {
        return defaultPublicContent;
      }
    },
    initialData: defaultPublicContent,
    staleTime: 60_000,
  });
