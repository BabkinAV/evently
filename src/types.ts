interface Event {
  id: string
  img: string
  title: string
  description: string
  plannedDate: string
}

interface User {
  userName: string
  jwt: string
}

interface EventResponse {
  id: string
  attributes: {
    title: string
    description: string
    plannedDate: string
    image: {
      data: {
        attributes: {
          url: string
        }
      }
    }
  }
}

interface LoginResponse {
  jwt: string
  user: {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
  }
}

interface ErrorResponse {
  data: null
  error: {
    status: string // HTTP status
    name: string // Strapi error name ('ApplicationError' or 'ValidationError')
    message: string // A human readable error message
    details: {}
  }
}

interface tokenPayload {
	id: number,
	iat: number,
	exp: number
}

export type { Event, EventResponse, LoginResponse, ErrorResponse, User, tokenPayload }
