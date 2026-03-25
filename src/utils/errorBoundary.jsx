import React from 'react';

/**
 * Error boundary — catches render errors in child components.
 * Falls back to a plain error message instead of crashing the whole app.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#dc2626' }}>
            <p>Something went wrong. Please refresh the page.</p>
            <details style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#666' }}>
              <summary>Error details</summary>
              <pre>{this.state.error?.message}</pre>
            </details>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
