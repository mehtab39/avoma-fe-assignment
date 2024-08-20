import React from 'react';
import { useQuery } from '@tanstack/react-query';

function withQuery(WrappedComponent, dataKey = 'data') {
    return function QueryComponent(props) {
        const { queryOptions, loadingText, errorText, ...restProps } = props;
        const { data, isLoading, error } = useQuery(queryOptions);

        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <h1 className="text-lg text-gray-600">{loadingText || 'Loading...'}</h1>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <h1 className="text-lg text-red-500">{errorText || 'Something went terribly wrong'}</h1>
                </div>
            );
        }

        return <WrappedComponent {...restProps} {...{ [dataKey]: data }} />;
    };
}

export default withQuery;
