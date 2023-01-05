import { View, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-native'

import Text from './Text'
import FormikTextInput from './FormikTextinput'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'
import useCreateUser from '../hooks/useCreateUser'

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
  username: yup.string().required('Username is required').min(1).max(30),
  password: yup.string().required('Password is required').min(5).max(50),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Password confirmation is required'),
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.inputs}
        name='username'
        placeholder='Username: '
      />
      <FormikTextInput
        style={styles.inputs}
        name='password'
        placeholder='Password: '
        secureTextEntry
      />
      <FormikTextInput
        style={styles.inputs}
        name='passwordConfirmation'
        placeholder='Retype password'
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.button.text}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

const SignUpContainer = ({ onSubmit }) => {
  const initValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  }
  return (
    <Formik
      initialValues={initValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const nav = useNavigate()
  const [signIn] = useSignIn()
  const [createUser] = useCreateUser()

  const onSubmit = async values => {
    try {
        await createUser(values)
        await signIn(values)
        nav('/')
    } catch (e) {
      console.log(e)
    }
  }
  return <SignUpContainer onSubmit={onSubmit} />
}
export default SignUp
