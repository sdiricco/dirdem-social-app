import inputDto from "@/dto/input-dto";
import { ISignIn, ISignUp } from "../interfaces/auth";
import { supabase } from "../main";
import handlers from "./utils/handlers";

const signIn = (signIn: ISignIn) => supabase.auth.signInWithPassword(signIn)
    .then(handlers.userInfoHandler(inputDto.rawUserInfoToUserInfo));

const signUp = (signUp: ISignUp) => supabase.auth.signUp(signUp)
  .then(handlers.userInfoHandler(inputDto.rawUserInfoToUserInfo))


export default {
  signIn,
  signUp
}