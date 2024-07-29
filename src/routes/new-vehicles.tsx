import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/new-vehicles')({
  component: () => <div>Hello /new-vehicles!</div>
})