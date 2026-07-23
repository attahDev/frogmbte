import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional label shown in the fallback so it's clear which section broke. */
  section?: string;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render-time errors in the wrapped subtree and shows a small
 * fallback instead of letting the crash take out the whole page (previously
 * there was no error boundary anywhere in the app, so any thrown error in
 * any component unmounted everything above it, which is what showed up as
 * a blank/black page for users).
 *
 * Wrap this around the app root, and optionally again around individual
 * dashboard sections/routes so one broken widget doesn't take the rest of
 * the page down with it.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error(`ErrorBoundary caught an error${this.props.section ? ` in ${this.props.section}` : ""}:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full rounded-[16px] border border-[#F3C6C6] bg-[#FDF0F0] p-6 text-center text-sm text-[#8A1F1F]">
          <p className="font-medium">
            {this.props.section ? `${this.props.section} couldn't be displayed.` : "Something went wrong."}
          </p>
          <p className="mt-1 text-xs text-[#8A1F1F]/80">Try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
