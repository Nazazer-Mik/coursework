import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/service-requests/$id')({
  component: () => <div>Hello /admin/service-requests/$id!</div>
})