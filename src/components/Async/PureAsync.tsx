import React from "react";
import { SpinLoading, ErrorBlock, AutoCenter } from "antd-mobile";
import { AsyncState } from "react-async";
import { type AsyncPropTypes } from "./AsyncPropTypes";
import { ApiClient } from "@/models/ApiClient";

type PureAsyncProps<R, P> = {
  apiClient: ApiClient;
  asyncState: AsyncState<R>;
  props: P;
  C: React.FC<P & AsyncPropTypes<R>>;
};

export default function PureAsync<R, P>({
  apiClient,
  asyncState,
  props,
  C,
}: PureAsyncProps<R, P>): JSX.Element {
  const { isLoading, error } = asyncState;
  if (isLoading) {
    return (
      <AutoCenter>
        <SpinLoading />
      </AutoCenter>
    );
  } else if (error) {
    return (
      <ErrorBlock
        fullPage
        title="Unexpected error"
        description={error.message}
      />
    );
  } else if (asyncState.data) {
    return <C {...props} apiClient={apiClient} data={asyncState.data} />;
  } else {
    return <></>;
  }
}
