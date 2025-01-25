"use client";

import { client } from "@/app/appwrite";
import getBoops from "@/server-api/getBoops";
import { RealtimeResponseEvent } from "appwrite";
import { useEffect, useState } from "react";

export default function BoopCounter() {
  const [boops, setBoops] = useState<number | null>(null);

  useEffect(() => {
    getBoops().then((boops) => setBoops(boops));

    client.subscribe(
      "databases.web.collections.counters.documents.veveBoops",
      (response: RealtimeResponseEvent<any>) => {
        setBoops(response.payload.count);
      }
    );
  }, []);
  return <p>Boops: {boops || "..."}</p>;
}
