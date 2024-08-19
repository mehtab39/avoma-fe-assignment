import React from 'react';
import { useQuery } from '@tanstack/react-query';

function withQuery(WrappedComponent) {
    return function QueryComponent(props) {
        const { data, isLoading, error } = useQuery(props.queryOptions);

        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <h1 className="text-lg text-gray-600">Loading...</h1>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <h1 className="text-lg text-red-500">Something went terribly wrong</h1>
                </div>
            );
        }

        return <WrappedComponent data={data} {...props} />;
    };
}

export default withQuery;
