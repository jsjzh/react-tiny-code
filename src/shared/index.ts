export const isDevelopment = process.env.NODE_ENV === 'development';

export const sleep = (timer: number) => new Promise<void>((resolve) => setTimeout(resolve, timer));

export const createNamespaceType = (namespace: string) => (type: string) => `${namespace}/${type}`;
