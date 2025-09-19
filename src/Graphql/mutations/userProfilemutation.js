import { gql } from "@apollo/client";

export const USER_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UserProfileInput!) {
  updateProfile(input: $input) {
    profile {
      firstName
      lastName
      phone
      dateOfBirth
    }
    email
  }
}
`;