import { $apiMain } from "@/api";
import type { IGreeting, IGreetingResponse } from "@/common/types";

export class GreetingsService {
  static async getGreetings(): Promise<{
    items: IGreetingResponse[];
    isFallback: boolean;
  }> {
    const response = await $apiMain.get<{
      Greetings: IGreetingResponse[];
      IsFallback?: boolean;
    }>("/greetings");
    return {
      items: response.data.Greetings,
      isFallback: Boolean(response.data.IsFallback),
    };
  }

  static sendGreeting(payload: IGreeting) {
    return $apiMain.post<{ Greeting: IGreetingResponse }>(
      "/greetings",
      payload,
    );
  }
}
