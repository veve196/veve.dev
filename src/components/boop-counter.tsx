"use client";

import { client } from "@/app/appwrite";
import getBoops from "@/client-api/getBoops";
import { CounterDocument } from "@/utils/models";
import { RealtimeResponseEvent } from "appwrite";
import { useEffect, useReducer } from "react";
import CountUp from "@/components/count-up";

type State = {
  prevBoops: number;
  boops: number | null;
};

type Action =
  | { type: "SET_BOOPS"; boops: number }
  | { type: "SET_PREV_BOOPS"; prevBoops: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_BOOPS":
      return { ...state, prevBoops: state.boops || 0, boops: action.boops };
    default:
      return state;
  }
}

export default function BoopCounter() {
  const [state, dispatch] = useReducer(reducer, { prevBoops: 0, boops: null });

  useEffect(() => {
    getBoops().then((boops) => dispatch({ type: "SET_BOOPS", boops }));

    const unsubscribe = client.subscribe(
      "databases.web.collections.counters.documents.veveBoops",
      (response: RealtimeResponseEvent<CounterDocument>) => {
        dispatch({ type: "SET_BOOPS", boops: response.payload.count });
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <p className="inline">Boops: </p>
      <CountUp
        from={state.prevBoops}
        to={state.boops || 0}
        separator=","
        direction="up"
        duration={1}
        className="count-up-text"
      />
    </>
  );
}
