import { ApiClient } from "@/models/ApiClient";

export type AsyncPropTypes<R> = {
  data: R;
  apiClient: ApiClient;
};
