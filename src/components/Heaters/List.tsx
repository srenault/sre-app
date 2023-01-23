import { useState } from "react";
import { List } from "antd-mobile";
import HeaterListItem from "./ListItem";
import { withAsyncComponent } from "@/components/Async";
import { GetStatusResponse } from "@/models/heaters/http/GetStatusResponse";
import { ApiClient } from "@/models/ApiClient";

type HeatersListProps = {
  apiClient: ApiClient;
  data: GetStatusResponse;
};

const HeatersList: React.FC<HeatersListProps> = (
  props: HeatersListProps,
): JSX.Element => {
  const [channels, setChannels] = useState(props.data.channels);

  const onChange = async (channelId: string, modeId: string) => {
    const response = await props.apiClient.heaters.updateChannel(
      channelId,
      modeId,
    );
    setChannels(response.channels);
  };

  return (
    <List header="Gestion des chauffages">
      {channels.map(({ id, name, modeId }) => (
        <HeaterListItem
          label={name}
          value={modeId}
          modes={props.data.modes}
          onChange={(newModeId) => onChange(id, newModeId)}
        />
      ))}
    </List>
  );
};

const asyncFetch = (apiClient: ApiClient): Promise<GetStatusResponse> => {
  return apiClient.heaters.fetchStatus();
};

export default withAsyncComponent(asyncFetch)(HeatersList);
