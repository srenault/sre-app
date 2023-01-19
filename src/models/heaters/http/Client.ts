import type { GetStatusResponse } from "./GetStatusResponse";
import { GetStatusResponseSchema } from "./GetStatusResponse";

export default class HeatersClient {
  endpoint: string;
  request: (url: string, init: RequestInit) => Promise<Response>;

  constructor(
    endpoint: string,
    request: (url: string, init: RequestInit) => Promise<Response>,
  ) {
    this.endpoint = endpoint;
    this.request = request;
  }

  async fetchStatus(): Promise<GetStatusResponse> {
    const res = await fetch(`${this.endpoint}/channels`);
    if (!res.ok) {
      throw new Error(`Unable to fetch heaters status: ${res.status}`);
    }
    const json = await res.json();

    return GetStatusResponseSchema.parse(json);
  }

  async fetchStatusMock(): Promise<GetStatusResponse> {
    return new Promise((resolve) => {
      const channels = [
        {
          id: "1",
          name: "Chambre Léon",
          modeId: "1",
        },
        {
          id: "2",
          name: "Chambre Bertille",
          modeId: "2",
        },
        {
          id: "3",
          name: "Salon - Salle à manger",
          modeId: "3",
        },
      ];

      const modes = [
        {
          id: "1",
          name: "Confort",
        },
        {
          id: "2",
          name: "Confort -1",
        },
        {
          id: "3",
          name: "Confort -2",
        },
        {
          id: "4",
          name: "Hors gel",
        },
      ];

      setTimeout(() => resolve({ channels, modes }), 1000);
    });
  }

  async updateChannel(
    channelId: string,
    modeId: string,
  ): Promise<GetStatusResponse> {
    const url = `${this.endpoint}/channels/${channelId}`;
    const options = {
      method: "PUT",
      body: JSON.stringify({ mode: modeId }),
    };
    const response = await this.request(url, options);
    const json = await response.json();

    return GetStatusResponseSchema.parse(json);
  }
}
