import { Button, Grid } from "antd-mobile";
import { apiClient, ApiClient } from "@/models/ApiClient";

type ShuttersUpdateProps = {
  apiClient: ApiClient;
  id: number;
};

const ShuttersUpdate = ({ id }: ShuttersUpdateProps): JSX.Element => {
  const onOpenClick = () => {
    apiClient.shutters.update(id, "open");
  };

  const onCloseClick = () => {
    apiClient.shutters.update(id, "close");
  };

  const onStopClick = () => {
    apiClient.shutters.update(id, "stop");
  };

  return (
    <Grid columns={1} gap={10}>
      <Grid.Item>
        <Button
          color="primary"
          fill="outline"
          size="large"
          onClick={onOpenClick}
          block
        >
          Ouvrir
        </Button>
      </Grid.Item>
      <Grid.Item>
        <Button
          color="primary"
          fill="outline"
          size="large"
          onClick={onCloseClick}
          block
        >
          Fermer
        </Button>
      </Grid.Item>
      <Grid.Item>
        <Button
          color="primary"
          fill="outline"
          size="large"
          onClick={onStopClick}
          block
        >
          Arrêter
        </Button>
      </Grid.Item>
    </Grid>
  );
};

export default ShuttersUpdate;
