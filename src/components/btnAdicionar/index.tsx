import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
};
export default function BtnAdicionar({ title, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="bg-slate-500 items-center justify-center w-10 rounded-lg"
      {...rest}
    >
      <Text className="text-white text-2xl text-center">{title}</Text>
    </TouchableOpacity>
  );
}