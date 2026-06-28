import { Component } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'
import Button from '@/components/ui/Button'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error in component tree:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-50 dark:bg-danger-500/10 mb-5">
            <AlertTriangle className="h-7 w-7 text-danger-500" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400 max-w-sm">
            An unexpected error occurred. Try reloading the page — if this keeps happening, please let us know.
          </p>
          <Button
            variant="brand"
            className="mt-6"
            leftIcon={<RefreshCcw className="h-4 w-4" />}
            onClick={() => window.location.reload()}
          >
            Reload page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
