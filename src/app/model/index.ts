import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** Date custom scalar type */
  Date: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};




export type AddUserMutationResponse = MutationResponse & {
   __typename?: 'AddUserMutationResponse',
  code: Scalars['String'],
  success: Scalars['Boolean'],
  message: Scalars['String'],
  user?: Maybe<User>,
};

export type AmountMutationResponse = MutationResponse & {
   __typename?: 'AmountMutationResponse',
  code: Scalars['String'],
  success: Scalars['Boolean'],
  message: Scalars['String'],
  newAmount?: Maybe<Scalars['Int']>,
};

export type AuctionHistory = {
   __typename?: 'AuctionHistory',
  time?: Maybe<Scalars['String']>,
  price?: Maybe<Scalars['Int']>,
  user?: Maybe<User>,
};

export type AuctionProduct = {
   __typename?: 'AuctionProduct',
  ownerId?: Maybe<Scalars['String']>,
  createTime?: Maybe<Scalars['Date']>,
  productName?: Maybe<Scalars['String']>,
  startTime?: Maybe<Scalars['Date']>,
  endTime?: Maybe<Scalars['Date']>,
  avatar?: Maybe<Scalars['String']>,
  images?: Maybe<Array<Maybe<Scalars['String']>>>,
  currentPrice?: Maybe<Scalars['Int']>,
  floorPrice?: Maybe<Scalars['Int']>,
  priceStep?: Maybe<Scalars['Int']>,
  finalPrice?: Maybe<Scalars['Int']>,
  winner?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['Int']>,
  productCategory?: Maybe<Scalars['String']>,
  auctionHistory?: Maybe<AuctionHistory>,
  auctionType?: Maybe<Scalars['String']>,
  owner?: Maybe<User>,
};

export type AuctionType = {
   __typename?: 'AuctionType',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type DeleteUserMutationResponse = MutationResponse & {
   __typename?: 'DeleteUserMutationResponse',
  code: Scalars['String'],
  success: Scalars['Boolean'],
  message: Scalars['String'],
  userId?: Maybe<Scalars['String']>,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  token?: Maybe<Scalars['String']>,
  refreshToken?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addUser?: Maybe<AddUserMutationResponse>,
  rechare?: Maybe<AmountMutationResponse>,
  updateUser?: Maybe<AddUserMutationResponse>,
  lockUser?: Maybe<DeleteUserMutationResponse>,
};


export type MutationAddUserArgs = {
  user?: Maybe<UserInput>
};


export type MutationRechareArgs = {
  userId?: Maybe<Scalars['String']>,
  change?: Maybe<Scalars['Int']>
};


export type MutationUpdateUserArgs = {
  user?: Maybe<UserInput>
};


export type MutationLockUserArgs = {
  id?: Maybe<Scalars['String']>
};

export type MutationResponse = {
  code: Scalars['String'],
  success: Scalars['Boolean'],
  message: Scalars['String'],
};

export type ProductCategory = {
   __typename?: 'ProductCategory',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  login?: Maybe<LoginResponse>,
  roles?: Maybe<Array<Maybe<Role>>>,
  productCategories?: Maybe<Array<Maybe<ProductCategory>>>,
  auctionTypes?: Maybe<Array<Maybe<AuctionType>>>,
  user?: Maybe<User>,
  users?: Maybe<Array<Maybe<User>>>,
  auctionProduct?: Maybe<AuctionProduct>,
  auctionProducts?: Maybe<Array<Maybe<AuctionProduct>>>,
  auctionProductsExist?: Maybe<Array<Maybe<AuctionProduct>>>,
};


export type QueryLoginArgs = {
  userName: Scalars['String'],
  password: Scalars['String']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryAuctionProductArgs = {
  ownerId: Scalars['String'],
  createTime: Scalars['Date']
};

export type Role = {
   __typename?: 'Role',
  slug: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  userName?: Maybe<Scalars['String']>,
  hashPassword?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  avatar?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  phoneNumber?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  vipMember?: Maybe<Scalars['Boolean']>,
  activeStatus?: Maybe<Scalars['Boolean']>,
  createTime?: Maybe<Scalars['Date']>,
  amount?: Maybe<Scalars['Int']>,
  role?: Maybe<Scalars['String']>,
};

export type UserInput = {
  id?: Maybe<Scalars['ID']>,
  userName?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  phoneNumber?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>,
};

export type AddUserMutationVariables = {
  user?: Maybe<UserInput>
};


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & { addUser: Maybe<(
    { __typename?: 'AddUserMutationResponse' }
    & Pick<AddUserMutationResponse, 'code' | 'message' | 'success'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);

export type GetAllProductCategoryQueryVariables = {};


export type GetAllProductCategoryQuery = (
  { __typename?: 'Query' }
  & { productCategories: Maybe<Array<Maybe<(
    { __typename?: 'ProductCategory' }
    & Pick<ProductCategory, 'id' | 'name'>
  )>>> }
);

export type GetAllUserQueryVariables = {};


export type GetAllUserQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName' | 'amount' | 'createTime' | 'activeStatus' | 'role'>
  )>>> }
);

export type GetAllRoleQueryVariables = {};


export type GetAllRoleQuery = (
  { __typename?: 'Query' }
  & { roles: Maybe<Array<Maybe<(
    { __typename?: 'Role' }
    & Pick<Role, 'slug' | 'name'>
  )>>> }
);

export type GetUserByIdQueryVariables = {
  id: Scalars['ID']
};


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName' | 'createTime' | 'amount' | 'firstName' | 'lastName' | 'address' | 'birthday' | 'phoneNumber' | 'email' | 'activeStatus' | 'role'>
  )> }
);

export type LockUserMutationVariables = {
  id?: Maybe<Scalars['String']>
};


export type LockUserMutation = (
  { __typename?: 'Mutation' }
  & { lockUser: Maybe<(
    { __typename?: 'DeleteUserMutationResponse' }
    & Pick<DeleteUserMutationResponse, 'code' | 'message' | 'success' | 'userId'>
  )> }
);

export type LoginQueryVariables = {
  userName: Scalars['String'],
  password: Scalars['String']
};


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token' | 'refreshToken'>
  )> }
);

export type RechareMutationVariables = {
  userId?: Maybe<Scalars['String']>,
  change?: Maybe<Scalars['Int']>
};


export type RechareMutation = (
  { __typename?: 'Mutation' }
  & { rechare: Maybe<(
    { __typename?: 'AmountMutationResponse' }
    & Pick<AmountMutationResponse, 'code' | 'message' | 'success' | 'newAmount'>
  )> }
);

export type UpdateUserMutationVariables = {
  user?: Maybe<UserInput>
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: Maybe<(
    { __typename?: 'AddUserMutationResponse' }
    & Pick<AddUserMutationResponse, 'code' | 'message' | 'success'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);


export const AddUserDocument = gql`
    mutation addUser($user: UserInput) {
  addUser(user: $user) {
    code
    message
    success
    user {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddUserGQL extends Apollo.Mutation<AddUserMutation, AddUserMutationVariables> {
    document = AddUserDocument;
    
  }
export const GetAllProductCategoryDocument = gql`
    query getAllProductCategory {
  productCategories {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllProductCategoryGQL extends Apollo.Query<GetAllProductCategoryQuery, GetAllProductCategoryQueryVariables> {
    document = GetAllProductCategoryDocument;
    
  }
export const GetAllUserDocument = gql`
    query getAllUser {
  users {
    id
    userName
    amount
    createTime
    activeStatus
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllUserGQL extends Apollo.Query<GetAllUserQuery, GetAllUserQueryVariables> {
    document = GetAllUserDocument;
    
  }
export const GetAllRoleDocument = gql`
    query getAllRole {
  roles {
    slug
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllRoleGQL extends Apollo.Query<GetAllRoleQuery, GetAllRoleQueryVariables> {
    document = GetAllRoleDocument;
    
  }
export const GetUserByIdDocument = gql`
    query getUserById($id: ID!) {
  user(id: $id) {
    id
    userName
    createTime
    amount
    firstName
    lastName
    address
    birthday
    phoneNumber
    email
    activeStatus
    role
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserByIdGQL extends Apollo.Query<GetUserByIdQuery, GetUserByIdQueryVariables> {
    document = GetUserByIdDocument;
    
  }
export const LockUserDocument = gql`
    mutation lockUser($id: String) {
  lockUser(id: $id) {
    code
    message
    success
    userId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LockUserGQL extends Apollo.Mutation<LockUserMutation, LockUserMutationVariables> {
    document = LockUserDocument;
    
  }
export const LoginDocument = gql`
    query login($userName: String!, $password: String!) {
  login(userName: $userName, password: $password) {
    token
    refreshToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Query<LoginQuery, LoginQueryVariables> {
    document = LoginDocument;
    
  }
export const RechareDocument = gql`
    mutation rechare($userId: String, $change: Int) {
  rechare(userId: $userId, change: $change) {
    code
    message
    success
    newAmount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RechareGQL extends Apollo.Mutation<RechareMutation, RechareMutationVariables> {
    document = RechareDocument;
    
  }
export const UpdateUserDocument = gql`
    mutation updateUser($user: UserInput) {
  updateUser(user: $user) {
    code
    message
    success
    user {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
  }