import "dotenv/config";
import axios, { AxiosError } from "axios";

const token = process.env.VAPI_TOKEN;

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
    throw new Error(
      `VAPI request failed: ${ax.response?.status} ${ax.response?.statusText} ` +
      `${typeof ax.response?.data === "string" ? ax.response?.data : JSON.stringify(ax.response?.data)}`
    );
  }
}

const createVapiAgent = async (name: string, firstMessage: string) => {
  if (!token) {
    throw new Error("VAPI_TOKEN missing. Set it in .env or your environment.");
  }
  const result = await createAssistant(token, {name, firstMessage});
  return result;
};

export default createVapiAgent;