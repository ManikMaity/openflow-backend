import { eq } from 'drizzle-orm';
import { dbInstance } from '../config/db.config';
import { users, UserWithoutPasswordHash } from '../db/schema/user.schema';
import { ServiceFunctionType } from '../types/common';
import { SignupSchemaType } from '../validations/user.validation';

export const signupUserService: ServiceFunctionType<
  SignupSchemaType,
  UserWithoutPasswordHash | null
> = async (payload, context) => {
  const { db } = context;
  const dbService = db || dbInstance();
  const { firstName, lastName, email, password } = payload;

  // Check if user with the same email already exists
  const exixtingUser = await dbService.select().from(users).where(eq(users.email, email)).limit(1);

  return exixtingUser;
};
