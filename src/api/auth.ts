import { ISignIn, ISignUp } from "./interfaces/auth";
import { supabase } from "../main";
import { ApiError } from "./errorHandler";

export async function signIn(signIn: ISignIn) {
  const { data, error } = await supabase.auth.signUp(signIn);
  if (error) {
    throw new ApiError(error.message, {
      details: error.name,
      code: error.status,
    });
  }
  return data;
}

export async function signUp(signUp: ISignUp) {
  const { data, error } = await supabase.auth.signUp(signUp);
  if (error) {
    throw new ApiError(error.message, {
      details: error.name,
      code: error.status,
    });
  }
  return data;
}
