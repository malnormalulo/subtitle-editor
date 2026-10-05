export function mergeIgnoringUndefined<T extends Record<string, any>>(
    target: T,
    source: Partial<T>
): T {
    const cleanedSource = Object.fromEntries(
        Object.entries(source).filter(([_, value]) => value !== undefined)
    );

    return { ...target, ...cleanedSource } as T;
}