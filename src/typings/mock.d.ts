type PData<T> = {
  items: T[];
} & T.PPage;

declare namespace Mock {
  type getApps = PData<{
    serialVersionUid: number;
    id: number;
    unitCode: string;
    appZone: string;
    appCode: string;
  }>;
}
