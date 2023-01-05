import { gql } from '@apollo/client'

export const CORE_REPO_FIELDS = gql`
  fragment CoreRepoFields on Repository {
    id
    description
    forksCount
    fullName
    language
    reviewCount
    ratingAverage
    stargazersCount
    ownerAvatarUrl
    url
  }
`

export const CORE_REVIEW_FIELDS = gql`
  fragment CoreReviewsFields on ReviewConnection {
    totalCount
    edges {
      node {
        id
        text
        rating
        createdAt
        repositoryId
        repository {
          url
        }
        user {
          id
          username
        }
      }
      cursor
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      startCursor
    }
  }
`
