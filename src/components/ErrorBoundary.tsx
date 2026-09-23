import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Clickit application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0C0E] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-[#12141C] border border-orange-500/30 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#00a6c7] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black text-white">Clickit Logistics Application</h1>
            <p className="text-sm text-zinc-400">
              An unexpected display issue occurred. Please click below to refresh the application.
            </p>
            {this.state.error && (
              <div className="bg-zinc-950 p-3 rounded-lg text-xs font-mono text-left text-orange-400 overflow-x-auto border border-zinc-800">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#00a6c7] hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
