import { gql } from "@apollo/client";

export const ADD_HOSPITALS = gql`
mutation Mutation($input: CreateHospitalInput!) {
  createHospital(input: $input) {
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

export const UPDATE_HOSPITALS = gql`
mutation UpdateHospital($updateHospitalId: ID!, $input: UpdateHospitalInput!) {
  updateHospital(id: $updateHospitalId, input: $input) {
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

export const DELETE_HOSPITALS = gql`
mutation DeleteHospital($deleteHospitalId: ID!) {
  deleteHospital(id: $deleteHospitalId)
}
`;

export const TOGGLE_HOSPITAL_STATUS = gql`
mutation SetHospitalStatus($setHospitalStatusId: ID!, $isActive: Boolean!) {
  setHospitalStatus(id: $setHospitalStatusId, isActive: $isActive) {
    isActive
    id
    hospitalName
  }
}
`;