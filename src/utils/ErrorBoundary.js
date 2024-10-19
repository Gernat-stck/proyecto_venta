import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error capturado por Error Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            toast.error("Algo salio mal.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            return <ToastContainer > </ToastContainer>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
