import { ErrorBoundary } from "react-error-boundary";
const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div>
            <h2>Something wend wrong, please try again</h2>
            <p>{error.message}</p>

            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );


}
export default ErrorFallback();