export interface IGreeting {
  name: string;
  city: string;
  greetings: string;
}

export interface IGreetingResponse extends IGreeting {
  _id: string;
  createdAt: string;
}
