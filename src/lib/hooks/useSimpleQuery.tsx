import { useEffect, useState } from "react";

interface Props<T> {
	defaultValues: T;
	query: () => Promise<T>;
}

export function useSimpleQuery<T>({ defaultValues, query }: Props<T>) {
	const [error, setError] = useState<any>();
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [item, setItem] = useState<T>(defaultValues);

	useEffect(() => {
		setIsLoading(true);
		query()
			.then((value) => setItem(value))
			.catch((e) => {
				setError(e);
				setIsError(true);
			})
			.finally(() => setIsLoading(false));
	}, [query]);

	return {
		item,
		error,
		isError,
		isLoading,
	};
}
