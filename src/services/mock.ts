import createAPI from '@/shared/createAPI';

const api = createAPI('greatwall-web.dasouche-inc.net');

export const getApps = async (data: { app: string } & T.IPage) => api.getJSON<Mock.getApps>(`/apps`, data);
