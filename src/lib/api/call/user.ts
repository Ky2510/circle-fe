import API from "..";

interface ILoginBody {
   username: string;
   password: string;
}

interface IRegisterBody {
   username: string;
   password: string;
   email: string;
   fullname: string;
}

export const loginApi = async (body: ILoginBody) => {
   return await API.post("login", body);
};

export const getOtherUsers = async (token: string) => {
   return await API.get('suggestion', {
      headers: { Authorization: `Bearer ${token}` },
   })
}

export const registerApi = async (body: IRegisterBody) => {
   return await API.post("register", body);
}

export const getUsers = async (token: string) => {
   return await API.get('users', {
      headers: { Authorization: `Bearer ${token}` },
   })
}