import { gql } from '@apollo/client';

export const GET_PATIENTS = gql`
 query Patients {
  patients {
    id
    firstName
    lastName
    phoneNumber
    age
    gender
    email
    address
    city
    state
    zipCode
    createdAt
    updatedAt
    country
    bloodGroup
    assaingnedDoctor {
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
      createdAt
      updatedAt
      age
      gender
      isActive
    }
    emergencyContact {
      name
      relationship
      emergencyContact
    }
    isActive
  }
}
`;