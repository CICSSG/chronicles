export {}

// Create a type for the roles
export type Roles = 'admin' | 'data'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}