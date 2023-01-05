import { gql } from '@apollo/client'
import { CORE_REPO_FIELDS, CORE_REVIEW_FIELDS } from './fragments'
export const GET_REPOSITORIES = gql`
  ${CORE_REPO_FIELDS}

  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          ...CoreRepoFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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
export const GET_CURRENT_USER = gql`
  ${CORE_REVIEW_FIELDS}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        ...CoreReviewsFields
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  ${CORE_REPO_FIELDS}
  ${CORE_REVIEW_FIELDS}
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...CoreRepoFields
      reviews(first: $first, after: $after) {
        ...CoreReviewsFields
      }
    }
  }
`
