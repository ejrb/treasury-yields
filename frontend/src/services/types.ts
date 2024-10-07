type Brand<T, Name extends string> = T & { __brand: Name };

export type DateStr = Brand<string, "date">;
export type Dollars = Brand<string, "dollars">;
