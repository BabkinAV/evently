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
		location: {
			id: number
			lon: number
			lat: number
			title: string
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
  id: number
  iat: number
  exp: number
}

interface reverseGeocodingResponse {
  type: string
  features: {
    type: string
    properties: {
      datasource: {
        sourcename: string
        attribution: string
        license: string
        url: string
      }
      name?: string
      country?: string
      county?: string
      country_code: string
      region: string
      state: string
      city: string
      postcode: string
      suburb: string
      street: string
      housenumber: string
      lon: number
      lat: number
      distance: number
      result_type: string
      formatted: string
      address_line1: string
      address_line2: string
      category: string
      timezone: {
        name: string
        offset_STD: string
        offset_STD_seconds: number
        offset_DST: string
        offset_DST_seconds: string
        abbreviation_STD: string
        abbreviation_DST: string
      }
      plus_code: string
      plus_code_short: string
      rank: {
        importance: number
        popularity: number
      }
      place_id: string
    }
    geometry: {
      type: number
      coordinates: [number, number]
    }
    bbox: [number, number, number, number]
  }[]
  query: {
    lat: number
    lon: number
    plus_code: string
  }
}

export type {
  Event,
  EventResponse,
  LoginResponse,
  ErrorResponse,
  User,
  tokenPayload,
  reverseGeocodingResponse
}
