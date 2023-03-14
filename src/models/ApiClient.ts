import React from "react";
import { Base64 } from "js-base64";
import HeatersClient from "./heaters/http/Client";
import AppConfig from "./AppConfig";

function generateBasicAuthToken(user: string, password: string) {
  return Base64.encode(`${user}:${password}`);
}

function request(
  basicAuthToken: string | undefined,
): (url: string, options?: RequestInit) => Promise<Response> {
  return (url, opts = {}) => {
    const defaultOptions = (() => {
      if (basicAuthToken) {
        const headers = new Headers();
        headers.append("Authorization", `Basic ${basicAuthToken}`);
        const credentials: RequestCredentials = "include";

        return {
          credentials,
          headers,
        };
      } else {
        return {};
      }
    })();

    return fetch(url, { ...defaultOptions, ...opts });
  };
}

export class ApiClient {
  heaters: HeatersClient;

  constructor(baseUrl: string, basicAuth: { user: string; password: string }) {
    if (!baseUrl) {
      throw new Error("Please specify baseUrl");
    }

    const { user, password } = basicAuth || {};
    const basicAuthToken =
      user && password && generateBasicAuthToken(user, password);

    this.heaters = new HeatersClient(
      `${baseUrl}/heaters`,
      request(basicAuthToken),
    );
  }
}

export const apiClient = new ApiClient(AppConfig.endpoint, {
  user: AppConfig.username,
  password: AppConfig.password,
});

export const ApiClientContext = React.createContext(apiClient);
