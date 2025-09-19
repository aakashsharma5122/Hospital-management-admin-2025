import { gql } from '@apollo/client';

export const CREATE_PATIENT = gql`
 mutation CreatePatient($input: CreatePatientInput!) {
  createPatient(input: $input) {
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

export const UPDATE_PATIENT = gql`
 mutation UpdatePatient($updatePatientId: ID!, $input: UpdatePatientInput!) {
  updatePatient(id: $updatePatientId, input: $input) {
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

export const DELETE_PATIENT = gql`
  mutation DeletePatient($deletePatientId: ID!) {
  deletePatient(id: $deletePatientId)
}
`;

export const TOGGLE_PATIENT_STATUS = gql`
 mutation SetPatientStatus($setPatientStatusId: ID!, $isActive: Boolean!) {
  setPatientStatus(id: $setPatientStatusId, isActive: $isActive) {
    id
    isActive
  }
}
`;