export type Nullable<T> = T | null

export interface Tag {
  text: string
}

export type Tags = Tag[]

export type RecordTypeValue = 'LOCAL' | 'LDAP'

export interface RecordType {
  value: Nullable<RecordTypeValue>
  label: string
}

export type RecordTypes = RecordType[]

export interface Account {
  id: string
  tags: Tags
  recordType: Nullable<RecordTypeValue>
  login: Nullable<string>
  password: Nullable<string>
}

export type Accounts = Account[]

export interface FormState {
  accounts: Accounts
}
