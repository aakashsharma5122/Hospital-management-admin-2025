import { gql } from "@apollo/client";

export const GET_STAFF = gql`
 query GetStaff {
  staffList {
    id
    staffType
    qualification
    experiance
    salary
    isActive
    createdAt
    updatedAt
  }
}
`;
