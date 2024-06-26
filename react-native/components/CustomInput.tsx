import { colors } from "@/styles/colors"
import { ReactNode } from "react"
import { KeyboardTypeOptions, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"

interface ICustomInput {
    leftIcon: ReactNode;
    rightIcon?: ReactNode;
    placeholder: string;
    placeholderType?: KeyboardTypeOptions | undefined;
    propStyles?: object;
    secureTextEntry?: boolean;
}
export const CustomInput = ({leftIcon, rightIcon, placeholder, placeholderType, propStyles, secureTextEntry}: ICustomInput) =>{

    return(
        <View style={[localStyles.mainContainer, propStyles]}>
            <View style={localStyles.leftSideContainer}>
                {leftIcon}
                <TextInput
                    style={localStyles.placeholderText}
                    autoComplete="off"
                    autoCapitalize="none"
                    placeholder={placeholder}
                    autoCorrect={false}
                    keyboardType={placeholderType}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={colors.inputPlaceholder}
                    blurOnSubmit={false}
                    secureTextEntry={secureTextEntry}
                />
            </View>
            <TouchableOpacity>
                {rightIcon && rightIcon}
            </TouchableOpacity>
        </View>
    )
}
const localStyles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 40,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1
    },
    leftSideContainer: {
        gap: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 14,
        fontWeight: '400'
    }
})