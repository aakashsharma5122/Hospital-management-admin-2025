import { gql } from "@apollo/client";

export const ADD_DOCTOR_MUTATION = gql`
mutation CreateDoctor($input: CreateDoctorInput!) {
  createDoctor(input: $input) {
    email
    experiance
    firstName
    isSurgeon
    lastName
    phoneNumber
    qualification
    shifttiming
    specialization
    gender
    age
  }
} `;


export const UPDATE_DOCTOR_MUTATION = gql`
mutation UpdateDoctor($updateDoctorId: ID!, $input: UpdateDoctorInput!) {
  updateDoctor(id: $updateDoctorId, input: $input) {
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
} `;




export const DELETE_DOCTOR_MUTATION = gql`
mutation DeleteDoctor($deleteDoctorId: ID!) {
  deleteDoctor(id: $deleteDoctorId)
} `;


export const TOGGLE_DOCTOR_STATUS_MUTATION = gql`
mutation SetDoctorStatus($setDoctorStatusId: ID!, $isActive: Boolean!) {
  setDoctorStatus(id: $setDoctorStatusId, isActive: $isActive) {
    id
    isActive
  }
}`;