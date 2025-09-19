// src/graphql/UserProfileQuery.js
import { gql } from "@apollo/client";

export const USER_PROFILE_QUERY = gql`
 query Me {
  me {
    id
    email
    role
    profile {
      firstName
      lastName
      phone
      dateOfBirth
    }
    isActive
    lastLogin
    createdAt
    updatedAt
  }
}
`;
