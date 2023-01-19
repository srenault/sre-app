import { useState } from "react";
import { List } from "antd-mobile";
import type { Mode } from "@/models/heaters/Mode";
import SelectMode from "./SelectMode";

type HeatersListItemProps = {
  label: string;
  value: string;
  modes: Mode[];
  onChange: (modeId: string) => void;
};

const HeatersListItem = ({
  label,
  value,
  modes,
  onChange,
}: HeatersListItemProps): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const onClick = () => setVisible(true);

  const onClose = () => setVisible(false);

  const currentMode = modes.find((mode) => mode.id === value);

  if (!currentMode) {
    return <></>;
  }

  return (
    <List.Item
      onClick={onClick}
      extra={
        <SelectMode
          currentMode={currentMode}
          onChange={onChange}
          visible={visible}
          modes={modes}
          onClose={onClose}
        />
      }
      clickable
    >
      {label}
    </List.Item>
  );
};

export default HeatersListItem;
