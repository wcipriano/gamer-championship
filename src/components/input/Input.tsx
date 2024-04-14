import { Input as NativeBaseInput, IInputProps, FormControl, Center } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

type InputProps = IInputProps &{
    errorMessage?: string | null
}

export function  Input({errorMessage = null, isInvalid, height=16, mb=2, bgColor="gray.100", ...res}: InputProps ){
    const invalid = !!errorMessage || isInvalid;
    return(
        <FormControl mb={mb} isInvalid={invalid}>
            <NativeBaseInput
                bgColor={bgColor}
                fontSize="md"
                h={height}
                px={3}
                mb={mb}
                placeholderTextColor={"gray.500"}
                isInvalid={invalid}
                _focus={{
                    bg: "gray.100",
                    borderWidth: "2px",
                    borderColor: "gray.500"
                }}    
                _invalid={{
                    borderWidth: "2px",
                    borderColor:"pink.300"
                }}
                {...res}
            />
            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
            
        </FormControl>
    );
}
