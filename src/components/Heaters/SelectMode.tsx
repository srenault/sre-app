import { Picker } from "antd-mobile";
import { PickerValue } from "antd-mobile/es/components/picker-view";
import type { Mode } from "@/models/heaters/Mode";

type HeatersSelectModeProps = {
  currentMode: Mode;
  modes: Mode[];
  onChange: (modeId: number) => void;
  onClose: () => void;
  visible: boolean;
};

const HeatersSelectMode = ({
  currentMode,
  modes,
  onChange,
  onClose,
  visible,
}: HeatersSelectModeProps): JSX.Element => {
  const columns = [
    modes.map(({ id, name }) => ({ label: name, value: id.toString() })),
  ];

  const onConfirm = (updatedValues: PickerValue[]) => {
    const updatedValue = updatedValues[0];
    const updatedMode = updatedValue && parseInt(updatedValue, 10);
    updatedMode && onChange(updatedMode);
  };

  return (
    <>
      {currentMode.name}
      <Picker
        confirmText="Valider"
        cancelText="Annuler"
        columns={columns}
        visible={visible}
        onConfirm={onConfirm}
        onClose={onClose}
        value={[currentMode.id.toString()]}
      />
    </>
  );
};

export default HeatersSelectMode;
