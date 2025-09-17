import { gql } from "@apollo/client";

export const DOCTOR_QUERY = gql`
  query Doctors {
  doctors {
    id
    firstName
    lastName
    phoneNumber
    experiance
    specialization
    qualification
    isSurgeon
    shifttiming
    email
    age
    gender
    isActive
  }
}
`;