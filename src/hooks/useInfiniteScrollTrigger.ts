import { useEffect } from "react";

interface UseInfiniteScrollTriggerProps {
  targetRef: React.RefObject<HTMLElement | null>;
  hasMore: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export const useInfiniteScrollTrigger = ({
  targetRef,
  hasMore,
  onLoadMore,
  rootMargin = "100px",
}: UseInfiniteScrollTriggerProps) => {
  useEffect(() => {
    if (!hasMore) return;

    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [targetRef, hasMore, onLoadMore, rootMargin]);
};
