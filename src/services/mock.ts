import createAPI from '@/shared/createAPI';

const api = createAPI(process.env.REACT_APP_MOCK_HOST);

export const fetchData = async (data: { query: string }) => api.getJSON<Mock.fetchData>(`/api/v1/search`, data);
