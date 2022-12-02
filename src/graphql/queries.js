import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        node {
          id
          description
          forksCount
          fullName
          language
          reviewCount
          ratingAverage
          stargazersCount
          ownerAvatarUrl
        }
      }
    }
  }
`

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`