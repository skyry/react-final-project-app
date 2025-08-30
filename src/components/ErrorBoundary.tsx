import React, {Component, ErrorInfo, ReactNode} from 'react';

interface Props {children: ReactNode;}

interface State {hasError: boolean; error?: Error;}

class ErrorBoundary extends Component<Props, State> {public state: State = {hasError: false};

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    if (error.message.includes('insertBefore') || error.message.includes('DOM')) {
      setTimeout(() => {
        this.setState({ hasError: false, error: undefined });
      }, 100);
    }
    else if (error.message.includes('product') || error.message.includes('fetch')) {
      setTimeout(() => {
        this.setState({ hasError: false, error: undefined });
      }, 1000);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      const isDOMError = this.state.error?.message.includes('insertBefore') || this.state.error?.message.includes('DOM');
      
      return (
        <div className="container mt-5">
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">
              {isDOMError ? 'Оновлення інтерфейсу...' : 'Щось пішло не так!'}
            </h4>
            <p>
              {isDOMError 
                ? (
                  <div className="d-flex align-items-center">
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Будь ласка, зачекайте, інтерфейс оновлюється...
                  </div>
                ) 
                : 'Виникла помилка при завантаженні компонента.'
              }
            </p>
            {!isDOMError && this.state.error?.message && (
              <small className="text-muted d-block mb-3">
                Деталі: {this.state.error.message}
              </small>
            )}
            {!isDOMError && (
              <>
                <hr />
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-outline-danger"
                    onClick={this.handleReset}
                  >
                    Спробувати знову
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => window.location.reload()}
                  >
                    Перезавантажити сторінку
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
