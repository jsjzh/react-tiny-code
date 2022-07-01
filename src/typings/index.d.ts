/// <reference types="node" />
/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
    readonly REACT_APP_MOCK_HOST: string;
  }
}

declare namespace T {
  interface IPage {
    pageNo: number;
    pageSize: number;
  }

  interface PPage {
    pageNo: number;
    pageSize: number;
    totalPage: number;
    totalSize: number;
  }
}
