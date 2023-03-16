import { type GetListResponse, GetListResponseSchema } from "./GetListResponse";
import { type Action } from "../Action";

export default class ShuttersClient {
  endpoint: string;
  request: (url: string, opts?: RequestInit) => Promise<Response>;

  constructor(
    endpoint: string,
    request: (url: string, opts?: RequestInit) => Promise<Response>,
  ) {
    this.endpoint = endpoint;
    this.request = request;
  }

  async list(): Promise<GetListResponse> {
    const res = await this.request(`${this.endpoint}`);
    if (!res.ok) {
      throw new Error(`Unable to fetch heaters status: ${res.status}`);
    }
    const json = await res.json();

    return GetListResponseSchema.parse(json);
  }

  async update(shutterId: number, action: Action): Promise<void> {
    const url = `${this.endpoint}/${shutterId}`;
    const options = {
      method: "PUT",
      body: JSON.stringify({ action }),
    };
    const response = await this.request(url, options);

    return await response.json().then(() => {});
  }
}
