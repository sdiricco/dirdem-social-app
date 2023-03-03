import { UserInfo } from "@/interfaces/user-info";
import { supabase } from "../main";
import { ApiError } from "./errorHandler";

/*****************************************************************************/
/* Fetch */
/*****************************************************************************/
export async function fetch(userId: string) :Promise<UserInfo> {
  const { data, error } = await supabase
    .from('user_info')
    .select('*')
    .eq('id', userId);
  if (error) {
    throw new ApiError(error.message, {
      details: error.details,
      code: Number(error.code),
    });
  }
  return data[0];
}

/*****************************************************************************/
/* Update */
/*****************************************************************************/
export async function update(userInfo: UserInfo) {
  const { data, error } = await supabase
    .from('user_info')
    .insert(userInfo);
  if (error) {
    throw new ApiError(error.message, {
      details: error.details,
      code: Number(error.code),
    });
  }
  return data;
}

