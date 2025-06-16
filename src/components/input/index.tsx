import { TextInput, TextInputProps } from "react-native";
import { Component } from "react";

type Props = TextInputProps & {
  title: string;
};

export class Input extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <TextInput
        className="border-b mb-4 border-slate-300 w-60 text-lg font-bold"
        placeholder={this.props.title}
        {...this.props}
      />
    );
  }
}
