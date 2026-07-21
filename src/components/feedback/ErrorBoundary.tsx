import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}

/** App-level error boundary with a branded recovery screen. */
export class ErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this is where we'd forward to an error reporter (Sentry).
    console.error('Unhandled render error:', error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  override render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow justify-center">system fault</p>
        <h1 className="mt-4 text-display-md">Something broke on our side.</h1>
        <p className="mt-4 max-w-md text-ink-dim">
          An unexpected error interrupted the page. Reloading usually clears it — if it keeps
          happening, let us know.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={this.handleReset}>Reload the page</Button>
          <Button to="/" variant="ghost">
            Back to home
          </Button>
        </div>
      </div>
    );
  }
}
