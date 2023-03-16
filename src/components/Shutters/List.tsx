import { useState } from "react";
import { List, Popup } from "antd-mobile";
import ShuttersListItem from "./ListItem";
import { withAsyncComponent } from "@/components/Async";
import { apiClient, ApiClient } from "@/models/ApiClient";
import { type GetListResponse } from "@/models/shutters/http/GetListResponse";
import ShuttersUpdate from "./Update";

type ShuttersListProps = {
  apiClient: ApiClient;
  data: GetListResponse;
};

const ShuttersList: React.FC<ShuttersListProps> = (
  props: ShuttersListProps,
): JSX.Element => {
  const [selectedShutter, setSelectedShutter] = useState<number>();
  const { shutters } = props.data;

  const onListItemClick = (id: number) => {
    setSelectedShutter(id);
  };

  return (
    <>
      <List header="Gestion des volets">
        {shutters.map(({ id, label }) => (
          <ShuttersListItem id={id} label={label} onClick={onListItemClick} />
        ))}
      </List>
      <Popup
        visible={!!selectedShutter}
        onMaskClick={() => {
          setSelectedShutter(undefined);
        }}
        bodyStyle={{ height: "40vh" }}
      >
        {selectedShutter && (
          <ShuttersUpdate id={selectedShutter} apiClient={apiClient} />
        )}
      </Popup>
    </>
  );
};

const asyncFetch = (apiClient: ApiClient): Promise<GetListResponse> => {
  return apiClient.shutters.list();
};

export default withAsyncComponent(asyncFetch)(ShuttersList);
