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
  name: string
  plannedDate: string
  description: string
  image: string
  location: {
    id: 1
    title: string
    lat: number
    long: number
  }
}

interface UserResponse {
  id: number
  name: string
  email: string
}

interface LoginResponse {
  token: string
  user: UserResponse
}

interface ErrorResponse {
  message: string
  line: number
  file: string
  exception: string
}

interface EventCreateResponse {
  data: {
    id: number
    attributes: {
      title: string
      description: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      plannedDate: string
    }
  }
  meta: {}
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
	UserResponse,
  LoginResponse,
  ErrorResponse,
  User,
  tokenPayload,
  reverseGeocodingResponse,
  EventCreateResponse
}
