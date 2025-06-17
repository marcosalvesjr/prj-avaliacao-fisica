import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
  TextProps,
  View,
} from "react-native";
type CardAvaliacaoProps = TouchableOpacityProps & {
  data: string;
};
export default function CardAvaliacao({ data }: CardAvaliacaoProps) {
  return (
    <View className="bg-slate-300 p-5 rounded-md flex-row justify-between gap-20">
      <View>
        <Text className="text-xl">Data: {data}</Text>
      </View>
      <View className="flex-row gap-5">
        <TouchableOpacity>
          <Text className="text-blue-500 font-bold">Visualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-red-500 font-bold ">Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
