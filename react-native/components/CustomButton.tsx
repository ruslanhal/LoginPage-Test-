import { ReactNode } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface ICustomButton {
    buttonText: string,
    propStylesContainer?: object,
    propStylesText?: object,
    icon?: ReactNode,
}
export const CustomButton = ({ buttonText, propStylesContainer, propStylesText, icon }: ICustomButton) =>{

    return(
        <TouchableOpacity style={[localStyles.buttonContainer, propStylesContainer]}>
            <View style={localStyles.buttonContent}>
                {icon && icon}
                <Text style={[localStyles.buttonText, propStylesText]}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    )
}
const localStyles = StyleSheet.create({
    buttonContainer: {
        height: 40,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 17,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }
})