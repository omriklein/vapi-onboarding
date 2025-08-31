import axios, { AxiosError } from "axios";

/** Reusable Axios instance */
const vapiApi = axios.create({
  baseURL: "https://api.vapi.ai",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});



export async function createAssistant(token: string, body: Record<string, unknown> = {}) {
  try {
    const res = await vapiApi.post("/assistant", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    const ax = err as AxiosError;
    // Helpful error logging
    throw new Error(
      `VAPI request failed: ${ax.response?.status} ${ax.response?.statusText} ` +
      `${typeof ax.response?.data === "string" ? ax.response?.data : JSON.stringify(ax.response?.data)}`
    );
  }
}

import "dotenv/config";

async function main() {
  const token = process.env.VAPI_TOKEN;
  if (!token) {
    throw new Error("VAPI_TOKEN missing. Set it in .env or your environment.");
  }
  
  // Add "server" to the body (This is where Vapi will send webhooks)
  const result = await createAssistant(token, {firstMessage: "Hi there, how are you?"});
  console.log("Success:", result);

  // TODO: Create a new phone with vapi and set the assistant (using assistantId)
}