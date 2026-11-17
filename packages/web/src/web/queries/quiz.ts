import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useSubmitQuiz() {
  return useMutation(orpc.quiz.submit.mutationOptions());
}
