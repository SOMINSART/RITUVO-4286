import { useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";
import { foodInput } from "../lib/quiz-data";
import type { Answers } from "../lib/quiz-data";
import { getUnlockToken } from "../lib/unlock";

/** Server-computed plan. Only the free days come back unless the unlock token is valid. */
export function usePlan(answers: Answers) {
  return useQuery(orpc.plan.compute.queryOptions({ input: { ...foodInput(answers), unlock: getUnlockToken() } }));
}
