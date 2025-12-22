import { Suspense } from "react";
import PageLoading from "@/app/components/ui/loader/PageLoading";
import FindClient from "@/app/components/page/find/FindClient";

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <FindClient />
    </Suspense>
  );
}
