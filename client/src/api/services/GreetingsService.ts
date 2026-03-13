import { $apiMain } from "@/api";
import type { IGreeting, IGreetingResponse } from "@/common/types";

export class GreetingsService {
  static async getGreetings(): Promise<IGreetingResponse[]> {
    const response = await $apiMain.get<{ Greetings: IGreetingResponse[] }>(
      "/greetings",
    );
    return response.data.Greetings;
  }

  static sendGreeting(payload: IGreeting) {
    return $apiMain.post<{ Greeting: IGreetingResponse }>(
      "/greetings",
      payload,
    );
  }
}
