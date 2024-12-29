"use client";

import { client } from "@/app/appwrite";
import { RealtimeResponseEvent } from "appwrite";
import { useEffect, useState } from "react";

export default function BoopCounter({ boopCount }: { boopCount: number }) {
  const [boops, setBoops] = useState<number>(boopCount);

  useEffect(() => {
    client.subscribe(
      "databases.web.collections.counters.documents.veveBoops",
      (response: RealtimeResponseEvent<any>) => {
        setBoops(response.payload.count);
      }
    );
  }, []);
  return <p>Boops: {boops}</p>;
}
