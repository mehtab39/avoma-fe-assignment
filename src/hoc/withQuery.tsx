import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

const MINUTE = 1000 * 60;
const DEFAULT_QUERY_OPTIONS = {
    staleTime: 5 * MINUTE,
    cacheTime: 10 * MINUTE,
};

interface WithQueryProps<TData> {
    queryOptions: UseQueryOptions<TData>;
    loadingText?: string;
    errorText?: string;
}

type WithQueryComponentProps<TData> = WithQueryProps<TData> & Record<string, any>;

function withQuery<TData>(
    WrappedComponent: React.ComponentType<any>,
    dataKey: string = 'data'
) {
    return function QueryComponent(props: WithQueryComponentProps<TData>): JSX.Element {
        const {
            queryOptions,
            loadingText,
            errorText,
            ...restProps
        } = props;

        const { data, isLoading, error }: UseQueryResult<TData> = useQuery({
            ...DEFAULT_QUERY_OPTIONS,
            ...queryOptions,
        });

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

        if (!data || (Array.isArray(data) && data.length === 0)) {
            return (
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <h1 className="text-lg text-gray-600">{`No ${dataKey} available. Try again later :(`}</h1>
                </div>
            );
        }

        return <WrappedComponent {...restProps} {...{ [dataKey]: data }} />;
    };
}

export default withQuery;
