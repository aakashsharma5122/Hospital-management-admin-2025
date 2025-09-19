import { gql } from "@apollo/client";

export const GET_HOSPITALS = gql`
 query Hospitals {
  hospitals {
    id
    hospitalName
    address
    phoneNumber
    email
    website
    numberOfBeds
    establishedYear
    departments
    isActive
    createdAt
    updatedAt
  }
}
`;