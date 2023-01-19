import React, { useCallback } from "react";
import { useAsync } from "react-async";
import PureAsync from "./PureAsync";
import { ApiClientContext, type ApiClient } from "@/models/ApiClient";
import { type AsyncPropTypes } from "./AsyncPropTypes";

type AsyncComponentPropTypes<P, R> = {
  props: P;
  C: React.FC<P & AsyncPropTypes<R>>;
  apiClient: ApiClient;
  asyncFetch: (apiClient: ApiClient, props: P) => Promise<R>;
};

function AsyncComponent<P, R>({
  props,
  C,
  apiClient,
  asyncFetch,
}: AsyncComponentPropTypes<P, R>): JSX.Element {
  const promiseFn = useCallback(() => asyncFetch(apiClient, props), [props]);
  const asyncState = useAsync({ ...props, promiseFn, watch: props });

  return (
    <PureAsync
      apiClient={apiClient}
      asyncState={asyncState}
      C={C}
      props={props}
    />
  );
}

export function withAsyncComponent<P, R>(
  asyncFetch: (apiClient: ApiClient, props: P) => Promise<R>,
): (C: React.FC<P & AsyncPropTypes<R>>) => React.FC<P> {
  return (C: React.FC<P & AsyncPropTypes<R>>): React.FC<P> => {
    return (props: P) => (
      <ApiClientContext.Consumer>
        {(apiClient) => (
          <AsyncComponent
            props={props}
            apiClient={apiClient}
            C={C}
            asyncFetch={asyncFetch}
          />
        )}
      </ApiClientContext.Consumer>
    );
  };
}
