import type { Question } from "@/utils/app_types";

export function submitQuiz() {
  return new Promise(resolve => {
    setTimeout(resolve, 500);
  })
}

export async function fetchEasyQuestions(): Promise<Question[]> {
  try {
    const resp = await fetch('/easy.json');
    const data = await resp.json();
    if (!resp.ok) {
      throw Error(data.message);
    }
    return data;
  } catch (e) {
    throw Error((e as Error).toString());
  }
}
