export type AppState = 'idle' | 'loading' | 'result'

export interface Category {
  id: string
  icon: string
  label: string
}

export interface Feature {
  icon: string
  iconColor: 'green' | 'blue' | 'purple'
  title: string
  description: string
}
