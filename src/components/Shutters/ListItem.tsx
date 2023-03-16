import { List } from "antd-mobile";

type ShuttersListItemProps = {
  id: number;
  label: string;
  onClick: (id: number) => void;
};

const ShuttersListItem = ({
  id,
  label,
  onClick,
}: ShuttersListItemProps): JSX.Element => {
  return (
    <List.Item onClick={() => onClick(id)} clickable>
      {label}
    </List.Item>
  );
};

export default ShuttersListItem;
