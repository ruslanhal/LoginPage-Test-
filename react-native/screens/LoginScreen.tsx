import { EyeSvg } from "@/assets/svgs/EyeSvg"
import { FacebookSvg } from "@/assets/svgs/FacebookSvg"
import { GoogleSvg } from "@/assets/svgs/GoogleSvg"
import { LetterSvg } from "@/assets/svgs/LetterSvg"
import { LockSvg } from "@/assets/svgs/LockSvg"
import { LogoSvg } from "@/assets/svgs/LogoSvg"
import { CustomButton } from "@/components/CustomButton"
import { CustomInput } from "@/components/CustomInput"
import { colors } from "@/styles/colors"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const LoginScreen = () =>{


  return(
    <View style={localStyles.mainBlock}>
      <LogoSvg/>
      <Text style={localStyles.title}>Log in</Text>
      <CustomInput leftIcon={<LetterSvg />} placeholder="Email" placeholderType="email-address"/>
      <CustomInput leftIcon={<LockSvg />} rightIcon={<EyeSvg/>} placeholder="Password" placeholderType="default" secureTextEntry={true} propStyles={{marginTop: 15}}/>
      <View style={localStyles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={localStyles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <CustomButton buttonText="Log in" propStylesContainer={localStyles.loginButton} propStylesText={{ color: '#fff' }}/>
      <View style={localStyles.lineContainer}>
        <View style={localStyles.line}></View>
        <Text style={localStyles.lineText}>Or</Text>
        <View style={localStyles.line}></View>
      </View>
      <View style={localStyles.buttonsContainer}>
        <CustomButton buttonText="Google" icon={<GoogleSvg/>} propStylesContainer={[localStyles.applicationButton, {flex: 2}]} propStylesText={{ color: colors.purple }}/>
        <CustomButton buttonText="Facebook" icon={<FacebookSvg/>} propStylesContainer={[localStyles.applicationButton, {flex: 2}]} propStylesText={{ color: colors.purple }}/>
      </View>
      <Text style={[localStyles.lineText, { marginTop: 40 }]}>Have no account yet?</Text>
      <CustomButton buttonText="Register" propStylesContainer={[localStyles.applicationButton, { width: '100%', marginTop: 20 }]} propStylesText={{ color: colors.purple }}/>
    </View>
  )
}

const localStyles = StyleSheet.create({
  mainBlock: {
    flex: 1,
    alignItems: 'center',
    padding: 40
  },
  title: {
    width: '100%',
    height: 30,
    marginTop: 40,
    marginBottom: 50,
    color: colors.purple,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 15,
    height: 18,
  },
  forgotPasswordText: {
    color: colors.purple,
    fontWeight: "600",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: colors.purple,
    marginTop: 40,
    width: '100%',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 100
  },
  line: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: colors.lightGrey
  },
  lineText: {
    fontSize: 14,
    fontWeight: '400',
    height: 17,
    color: colors.inputPlaceholder,
    marginHorizontal: 5,
  },
  buttonsContainer: {
    marginTop: 15,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicationButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
  }
})