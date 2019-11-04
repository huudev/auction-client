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

export type AuctionCondition = {
   __typename?: 'AuctionCondition',
  vipAccount?: Maybe<Scalars['Boolean']>,
  accountActiveDay?: Maybe<Scalars['Int']>,
};

export type AuctionConditionInput = {
  vipAccount?: Maybe<Scalars['Boolean']>,
  accountActiveDay?: Maybe<Scalars['Int']>,
};

export type AuctionHistory = {
   __typename?: 'AuctionHistory',
  time?: Maybe<Scalars['Date']>,
  price?: Maybe<Scalars['Int']>,
  userName?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['String']>,
};

export type AuctionMutationResponse = MutationResponse & {
   __typename?: 'AuctionMutationResponse',
  code: Scalars['String'],
  success: Scalars['Boolean'],
  message: Scalars['String'],
  productId?: Maybe<Scalars['String']>,
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
  ceilingPrice?: Maybe<Scalars['Int']>,
  priceStep?: Maybe<Scalars['Int']>,
  finalPrice?: Maybe<Scalars['Int']>,
  winner?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['Int']>,
  productCategory?: Maybe<ProductCategory>,
  auctionHistory?: Maybe<Array<Maybe<AuctionHistory>>>,
  auctionCondition?: Maybe<AuctionCondition>,
  auctionType?: Maybe<AuctionType>,
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
  addProduct?: Maybe<Response>,
  auction?: Maybe<Response>,
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


export type MutationAddProductArgs = {
  product?: Maybe<ProductInput>
};


export type MutationAuctionArgs = {
  ownerId: Scalars['String'],
  createTime: Scalars['Date'],
  price: Scalars['Int']
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

export type ProductInput = {
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
  stepPrice?: Maybe<Scalars['Int']>,
  ceilingPrice?: Maybe<Scalars['Int']>,
  finalPrice?: Maybe<Scalars['Int']>,
  winner?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['Int']>,
  productCategory?: Maybe<Scalars['String']>,
  auctionType?: Maybe<Scalars['String']>,
  auctionCondition?: Maybe<AuctionConditionInput>,
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
  thongKe?: Maybe<ThongKe>,
};


export type QueryLoginArgs = {
  userName: Scalars['String'],
  password: Scalars['String']
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>,
  userName?: Maybe<Scalars['String']>
};


export type QueryAuctionProductArgs = {
  ownerId: Scalars['String'],
  createTime: Scalars['Date']
};


export type QueryAuctionProductsArgs = {
  ownerId?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['String']>
};


export type QueryAuctionProductsExistArgs = {
  categoryId?: Maybe<Scalars['String']>
};

export type Response = {
   __typename?: 'Response',
  code: Scalars['String'],
  success: Scalars['Boolean'],
  message: Scalars['String'],
};

export type Role = {
   __typename?: 'Role',
  slug: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  auctionAdded: AuctionProduct,
};


export type SubscriptionAuctionAddedArgs = {
  product?: Maybe<ProductInput>
};

export type ThongKe = {
   __typename?: 'ThongKe',
  vip?: Maybe<Scalars['Int']>,
  nonVip?: Maybe<Scalars['Int']>,
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
  products?: Maybe<Array<Maybe<AuctionProduct>>>,
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
  createTime?: Maybe<Scalars['Date']>,
  vipMember?: Maybe<Scalars['Boolean']>,
  amount?: Maybe<Scalars['Int']>,
};

export type AddAuctionMutationVariables = {
  ownerId: Scalars['String'],
  createTime: Scalars['Date'],
  price: Scalars['Int']
};


export type AddAuctionMutation = (
  { __typename?: 'Mutation' }
  & { auction: Maybe<(
    { __typename?: 'Response' }
    & Pick<Response, 'code' | 'message' | 'success'>
  )> }
);

export type AddProductMutationVariables = {
  product?: Maybe<ProductInput>
};


export type AddProductMutation = (
  { __typename?: 'Mutation' }
  & { addProduct: Maybe<(
    { __typename?: 'Response' }
    & Pick<Response, 'code' | 'message' | 'success'>
  )> }
);

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

export type GetAllAuctionTypeQueryVariables = {};


export type GetAllAuctionTypeQuery = (
  { __typename?: 'Query' }
  & { auctionTypes: Maybe<Array<Maybe<(
    { __typename?: 'AuctionType' }
    & Pick<AuctionType, 'id' | 'name'>
  )>>> }
);

export type GetAllProductCategoryQueryVariables = {};


export type GetAllProductCategoryQuery = (
  { __typename?: 'Query' }
  & { productCategories: Maybe<Array<Maybe<(
    { __typename?: 'ProductCategory' }
    & Pick<ProductCategory, 'id' | 'name'>
  )>>> }
);

export type GetAllProductsQueryVariables = {
  ownerId?: Maybe<Scalars['String']>
};


export type GetAllProductsQuery = (
  { __typename?: 'Query' }
  & { auctionProducts: Maybe<Array<Maybe<(
    { __typename?: 'AuctionProduct' }
    & Pick<AuctionProduct, 'ownerId' | 'createTime' | 'productName' | 'startTime' | 'endTime' | 'avatar' | 'images' | 'currentPrice' | 'floorPrice' | 'ceilingPrice' | 'priceStep' | 'finalPrice' | 'winner' | 'description' | 'status'>
    & { productCategory: Maybe<(
      { __typename?: 'ProductCategory' }
      & Pick<ProductCategory, 'id' | 'name'>
    )>, auctionCondition: Maybe<(
      { __typename?: 'AuctionCondition' }
      & Pick<AuctionCondition, 'vipAccount' | 'accountActiveDay'>
    )>, auctionType: Maybe<(
      { __typename?: 'AuctionType' }
      & Pick<AuctionType, 'id' | 'name'>
    )>, owner: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'userName'>
    )> }
  )>>> }
);

export type GetAllProductExistQueryVariables = {};


export type GetAllProductExistQuery = (
  { __typename?: 'Query' }
  & { auctionProductsExist: Maybe<Array<Maybe<(
    { __typename?: 'AuctionProduct' }
    & Pick<AuctionProduct, 'ownerId' | 'createTime' | 'productName' | 'startTime' | 'endTime' | 'avatar' | 'images' | 'currentPrice' | 'floorPrice' | 'ceilingPrice' | 'priceStep' | 'finalPrice' | 'winner' | 'description' | 'status'>
    & { productCategory: Maybe<(
      { __typename?: 'ProductCategory' }
      & Pick<ProductCategory, 'id' | 'name'>
    )>, auctionCondition: Maybe<(
      { __typename?: 'AuctionCondition' }
      & Pick<AuctionCondition, 'vipAccount' | 'accountActiveDay'>
    )>, auctionType: Maybe<(
      { __typename?: 'AuctionType' }
      & Pick<AuctionType, 'id' | 'name'>
    )>, owner: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'userName'>
    )> }
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

export type GetProductByIdQueryVariables = {
  ownerId: Scalars['String'],
  createTime: Scalars['Date']
};


export type GetProductByIdQuery = (
  { __typename?: 'Query' }
  & { auctionProduct: Maybe<(
    { __typename?: 'AuctionProduct' }
    & Pick<AuctionProduct, 'ownerId' | 'createTime' | 'productName' | 'startTime' | 'endTime' | 'avatar' | 'images' | 'currentPrice' | 'floorPrice' | 'ceilingPrice' | 'priceStep' | 'finalPrice' | 'winner' | 'description' | 'status'>
    & { auctionHistory: Maybe<Array<Maybe<(
      { __typename?: 'AuctionHistory' }
      & Pick<AuctionHistory, 'time' | 'price' | 'userName' | 'userId'>
    )>>>, productCategory: Maybe<(
      { __typename?: 'ProductCategory' }
      & Pick<ProductCategory, 'id' | 'name'>
    )>, auctionCondition: Maybe<(
      { __typename?: 'AuctionCondition' }
      & Pick<AuctionCondition, 'vipAccount' | 'accountActiveDay'>
    )>, auctionType: Maybe<(
      { __typename?: 'AuctionType' }
      & Pick<AuctionType, 'id' | 'name'>
    )>, owner: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'userName'>
    )> }
  )> }
);

export type GetProductsByCategoryQueryVariables = {
  categoryId?: Maybe<Scalars['String']>
};


export type GetProductsByCategoryQuery = (
  { __typename?: 'Query' }
  & { auctionProductsExist: Maybe<Array<Maybe<(
    { __typename?: 'AuctionProduct' }
    & Pick<AuctionProduct, 'ownerId' | 'createTime' | 'productName' | 'startTime' | 'endTime' | 'avatar' | 'images' | 'currentPrice' | 'floorPrice' | 'ceilingPrice' | 'priceStep' | 'finalPrice' | 'winner' | 'description' | 'status'>
    & { productCategory: Maybe<(
      { __typename?: 'ProductCategory' }
      & Pick<ProductCategory, 'id' | 'name'>
    )>, auctionCondition: Maybe<(
      { __typename?: 'AuctionCondition' }
      & Pick<AuctionCondition, 'vipAccount' | 'accountActiveDay'>
    )>, auctionType: Maybe<(
      { __typename?: 'AuctionType' }
      & Pick<AuctionType, 'id' | 'name'>
    )>, owner: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'userName'>
    )> }
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

export type ThongKeQueryVariables = {};


export type ThongKeQuery = (
  { __typename?: 'Query' }
  & { thongKe: Maybe<(
    { __typename?: 'ThongKe' }
    & Pick<ThongKe, 'vip' | 'nonVip'>
  )> }
);

export type GetUserByIdQueryVariables = {
  id?: Maybe<Scalars['ID']>,
  userName?: Maybe<Scalars['String']>
};


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { user: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName' | 'createTime' | 'amount' | 'firstName' | 'lastName' | 'address' | 'birthday' | 'phoneNumber' | 'vipMember' | 'email' | 'activeStatus' | 'role'>
    & { products: Maybe<Array<Maybe<(
      { __typename?: 'AuctionProduct' }
      & Pick<AuctionProduct, 'ownerId' | 'createTime'>
    )>>> }
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

export type SubscriptionAuctionSubscriptionVariables = {
  product?: Maybe<ProductInput>
};


export type SubscriptionAuctionSubscription = (
  { __typename?: 'Subscription' }
  & { auctionAdded: (
    { __typename?: 'AuctionProduct' }
    & Pick<AuctionProduct, 'ownerId' | 'createTime' | 'winner'>
    & { auctionHistory: Maybe<Array<Maybe<(
      { __typename?: 'AuctionHistory' }
      & Pick<AuctionHistory, 'time' | 'price' | 'userName' | 'userId'>
    )>>> }
  ) }
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


export const AddAuctionDocument = gql`
    mutation addAuction($ownerId: String!, $createTime: Date!, $price: Int!) {
  auction(ownerId: $ownerId, createTime: $createTime, price: $price) {
    code
    message
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddAuctionGQL extends Apollo.Mutation<AddAuctionMutation, AddAuctionMutationVariables> {
    document = AddAuctionDocument;
    
  }
export const AddProductDocument = gql`
    mutation addProduct($product: ProductInput) {
  addProduct(product: $product) {
    code
    message
    success
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddProductGQL extends Apollo.Mutation<AddProductMutation, AddProductMutationVariables> {
    document = AddProductDocument;
    
  }
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
export const GetAllAuctionTypeDocument = gql`
    query getAllAuctionType {
  auctionTypes {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllAuctionTypeGQL extends Apollo.Query<GetAllAuctionTypeQuery, GetAllAuctionTypeQueryVariables> {
    document = GetAllAuctionTypeDocument;
    
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
export const GetAllProductsDocument = gql`
    query getAllProducts($ownerId: String) {
  auctionProducts(ownerId: $ownerId) {
    ownerId
    createTime
    productName
    startTime
    endTime
    avatar
    images
    currentPrice
    floorPrice
    ceilingPrice
    priceStep
    finalPrice
    winner
    description
    status
    productCategory {
      id
      name
    }
    auctionCondition {
      vipAccount
      accountActiveDay
    }
    auctionType {
      id
      name
    }
    owner {
      userName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllProductsGQL extends Apollo.Query<GetAllProductsQuery, GetAllProductsQueryVariables> {
    document = GetAllProductsDocument;
    
  }
export const GetAllProductExistDocument = gql`
    query getAllProductExist {
  auctionProductsExist {
    ownerId
    createTime
    productName
    startTime
    endTime
    avatar
    images
    currentPrice
    floorPrice
    ceilingPrice
    priceStep
    finalPrice
    winner
    description
    status
    productCategory {
      id
      name
    }
    auctionCondition {
      vipAccount
      accountActiveDay
    }
    auctionType {
      id
      name
    }
    owner {
      userName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllProductExistGQL extends Apollo.Query<GetAllProductExistQuery, GetAllProductExistQueryVariables> {
    document = GetAllProductExistDocument;
    
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
export const GetProductByIdDocument = gql`
    query getProductById($ownerId: String!, $createTime: Date!) {
  auctionProduct(ownerId: $ownerId, createTime: $createTime) {
    ownerId
    createTime
    productName
    startTime
    endTime
    avatar
    images
    currentPrice
    floorPrice
    ceilingPrice
    priceStep
    finalPrice
    winner
    description
    status
    auctionHistory {
      time
      price
      userName
      userId
    }
    productCategory {
      id
      name
    }
    auctionCondition {
      vipAccount
      accountActiveDay
    }
    auctionType {
      id
      name
    }
    owner {
      userName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductByIdGQL extends Apollo.Query<GetProductByIdQuery, GetProductByIdQueryVariables> {
    document = GetProductByIdDocument;
    
  }
export const GetProductsByCategoryDocument = gql`
    query getProductsByCategory($categoryId: String) {
  auctionProductsExist(categoryId: $categoryId) {
    ownerId
    createTime
    productName
    startTime
    endTime
    avatar
    images
    currentPrice
    floorPrice
    ceilingPrice
    priceStep
    finalPrice
    winner
    description
    status
    productCategory {
      id
      name
    }
    auctionCondition {
      vipAccount
      accountActiveDay
    }
    auctionType {
      id
      name
    }
    owner {
      userName
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductsByCategoryGQL extends Apollo.Query<GetProductsByCategoryQuery, GetProductsByCategoryQueryVariables> {
    document = GetProductsByCategoryDocument;
    
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
export const ThongKeDocument = gql`
    query thongKe {
  thongKe {
    vip
    nonVip
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ThongKeGQL extends Apollo.Query<ThongKeQuery, ThongKeQueryVariables> {
    document = ThongKeDocument;
    
  }
export const GetUserByIdDocument = gql`
    query getUserById($id: ID, $userName: String) {
  user(id: $id, userName: $userName) {
    id
    userName
    createTime
    amount
    firstName
    lastName
    address
    birthday
    phoneNumber
    vipMember
    email
    activeStatus
    role
    products {
      ownerId
      createTime
    }
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
export const SubscriptionAuctionDocument = gql`
    subscription subscriptionAuction($product: ProductInput) {
  auctionAdded(product: $product) {
    ownerId
    createTime
    winner
    auctionHistory {
      time
      price
      userName
      userId
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SubscriptionAuctionGQL extends Apollo.Subscription<SubscriptionAuctionSubscription, SubscriptionAuctionSubscriptionVariables> {
    document = SubscriptionAuctionDocument;
    
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