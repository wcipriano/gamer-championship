import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps &  {
    title: string;
    color?: string
}
export function Button({title, color="green.700", height=16, width='full', ...res}: Props){
    return(
        <ButtonNativeBase
            w={width}
            h={height}
            bg={color}
            _pressed={{
                bgColor:"green.900"
            }}
            {...res}
        >
            <Text color= "white" fontSize={24}>{title}</Text>
        </ButtonNativeBase>
    )
}
