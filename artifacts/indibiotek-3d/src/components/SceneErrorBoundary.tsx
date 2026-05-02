import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class SceneErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="fixed inset-0 w-full h-full z-0"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, #0d2a2a 0%, #050A15 60%, #020810 100%)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(83,207,207,0.04) 0%, transparent 70%)`,
            }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
