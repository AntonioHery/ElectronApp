import axios  from "axios";
import { IEtudiant } from "../type/IEtudiant";
export const postUser = async (data: IEtudiant) => {
    const response= await axios.post(
      `/v1/user/`,
      data
    );
  
    return response;
  };
  