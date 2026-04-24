"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

/**
 * React ErrorBoundary — catches any unhandled client-side render crash.
 * Instead of showing a blank white page, customers see a branded fallback
 * with the phone number so they can still reach Squito.
 */
export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production you would pipe this to Sentry / Datadog:
    console.error("[ErrorBoundary] Caught render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0f0a",
            color: "#fff",
            fontFamily: "sans-serif",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🦟</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Something went wrong on our end.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem", maxWidth: "400px" }}>
            We&apos;re sorry about the trouble! Our team has been notified. In the meantime, give us a call and we&apos;ll take care of you right away.
          </p>
          <a
            href="tel:6312031000"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#22c55e",
              color: "#fff",
              padding: "0.875rem 2rem",
              borderRadius: "9999px",
              fontWeight: 700,
              fontSize: "1.125rem",
              textDecoration: "none",
            }}
          >
            📞 (631) 203-1000
          </a>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, errorMessage: "" })}
            style={{
              marginTop: "1rem",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.5)",
              padding: "0.5rem 1.5rem",
              borderRadius: "9999px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
