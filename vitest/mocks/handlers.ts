import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://railway.bookreview.techtrain.dev/signin", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };
    if (email === "test1@mail.com" && password === "test1") {
      return HttpResponse.json(
        {
          token: "test1_token",
        },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(null, { status: 404 });
    }
  }),
];
