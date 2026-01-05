import { DB } from '../config/db.config';

type ServiceContext = {
  db: DB;
};

export type ServiceFunctionType<TPayload, TResult> = (
  payload: TPayload,
  context: ServiceContext,
) => Promise<TResult>;
