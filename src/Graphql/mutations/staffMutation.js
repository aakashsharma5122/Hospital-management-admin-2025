import { gql } from "@apollo/client";

export const ADD_STAFF = gql`
  mutation CreateStaffInput($input: CreateStaffInput!) {
  CreateStaffInput(input: $input) {
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

export const UPDATE_STAFF = gql`
  mutation UpdateStaffInput($updateStaffInputId: ID!, $input: UpdateStaffInput!) {
  UpdateStaffInput(id: $updateStaffInputId, input: $input) {
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

export const DELETE_STAFF = gql`
 mutation DeleteStaff($deleteStaffId: ID!) {
  deleteStaff(id: $deleteStaffId)
}
`;

export const TOGGLE_STAFF_STATUS = gql`
 mutation SetStaffStatus($setStaffStatusId: ID!, $isActive: Boolean!) {
  setStaffStatus(id: $setStaffStatusId, isActive: $isActive) {
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