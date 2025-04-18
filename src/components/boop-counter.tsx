"use client";

import { client } from "@/app/appwrite";
import getBoops from "@/client-api/getBoops";
import { CounterDocument } from "@/utils/models";
import { RealtimeResponseEvent } from "appwrite";
import { useEffect, useState } from "react";
import CountUp from "@/components/count-up";

export default function BoopCounter() {
  const [prevBoops, setPrevBoops] = useState<number>(0);
  const [boops, setBoops] = useState<number | null>(null);

  useEffect(() => {
    getBoops().then((boops) => setBoops(boops));

    client.subscribe(
      "databases.web.collections.counters.documents.veveBoops",
      (response: RealtimeResponseEvent<CounterDocument>) => {
        setBoops(response.payload.count);
        setPrevBoops(boops || 0);
      }
    );
  }, []);
  return (
    <>
      <p className="inline">Boops: </p>
      <CountUp
        from={prevBoops}
        to={boops || 0}
        separator=","
        direction="up"
        duration={1}
        className="count-up-text"
      />
    </>
  );
}
