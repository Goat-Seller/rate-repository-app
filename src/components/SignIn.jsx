import { View, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'

import Text from './Text'
import FormikTextInput from './FormikTextinput'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center',
  },
  inputs: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    borderStyle: 'solid',
    alignSelf: 'stretch',
    margin: theme.margin.main,
    padding: theme.padding.main,
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.subheading,
  },
  button: {
    text: {
      textAlign: 'center',
      fontSize: theme.fontSizes.subheading,
      fontWeight: theme.fontWeights.bold,
      fontFamily: theme.fonts.main,
      color: 'white',
    },
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    borderStyle: 'solid',
    margin: theme.margin.main,
    padding: theme.padding.main,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.primary,
  },
})

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const SignInForm = ({ onSubmit }) => {

  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.inputs}
        name='username'
        placeholder='Username: '
      />
      <FormikTextInput
        style={styles.inputs}
        secureTextEntry
        name='password'
        placeholder='Password: '
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.button.text}>Sign In</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const nav = useNavigate()
  const [signIn] = useSignIn()
  const initValues = {
    username: '',
    password: '',
  }
  const onSubmit = async values => {
    try {
      const { data } = await signIn(values)
      nav('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik
      initialValues={initValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
