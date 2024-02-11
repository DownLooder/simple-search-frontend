import { BASE_API_URL } from "./constants";
import { Info, InfoRequest, Response } from "./types";

export async function requestInfo(info: InfoRequest) {
  const url = new URL("info", BASE_API_URL);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  if (!response.ok) {
    console.log("there was an issue");
    const error = await response.text();
    console.log(error);
    return { error } as Response;
  }
  const json = await response.json();
  console.log({ json });
  return json as Info;
}
