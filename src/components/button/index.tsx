import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
};
export default function Button({ title, ...rest }: Props) {
  return (
    <TouchableOpacity
      className="bg-blue-500 px-5 py-2 rounded-lg w-96"
      {...rest}
    >
      <Text className="text-white text-2xl text-center">{title}</Text>
    </TouchableOpacity>
  );
}
