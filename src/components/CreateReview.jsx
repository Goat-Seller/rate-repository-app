import { Pressable, StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import FormikTextInput from './FormikTextinput'
import Text from './Text'
import theme from '../theme'
import useCreateReview from '../hooks/useCreateReview'

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
    textAlignVertical: 'top',
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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
  .number()
  .integer('Rating must be integer')
  .required('Rating is required')
  .min(0, "Rating can't be less then zero")
  .max(100, "Rating can't be more then hundred")
})

const CreateReviewForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <FormikTextInput
      style={styles.inputs}
      name='ownerName'
      placeholder='Repository owner name'
    />
    <FormikTextInput
      style={styles.inputs}
      name='repositoryName'
      placeholder='Repository name'
    />
    <FormikTextInput
      style={styles.inputs}
      name='rating'
      placeholder='Rating between 0 and 100'
    />
    <FormikTextInput style={styles.inputs} multiline name='text' placeholder='Review' />
    <Pressable style={styles.button} onPress={onSubmit}>
      <Text style={styles.button.text} >Create a review</Text>
    </Pressable>
  </View>
)

const CreateReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReview = () => {
  const nav = useNavigate()
  const [createReview] = useCreateReview()

  const onSubmit = async values => {
    try {
      const data = await createReview(values)
      nav(`/repository/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e)
    }
  }
  return <CreateReviewContainer onSubmit={onSubmit} />
}

export default CreateReview
