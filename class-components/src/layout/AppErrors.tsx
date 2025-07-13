import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class AppErrors extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-700 p-4">
          <h1 className="text-3xl font-bold mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-lg">
            An unexpected error has occurred. Please try refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
export default AppErrors;
