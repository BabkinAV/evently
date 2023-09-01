interface Event {
  id: string
  img: string
  title: string
  description: string
  plannedDate: string
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


export type { Event, EventResponse }
