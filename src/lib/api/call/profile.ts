import API from "..";

export const getProfile = async (token: string) => {
   return await API.get("profile", {
      headers: { Authorization: `Bearer ${token}` },
   });
};

export const getOtherProfile = async (id: number) => {
   return await API.get(`profile/:${id}`)
}

// type TKey = "bio" | "avatar" | "cover";

type TBody = {
   [key: string]: string | File | null | undefined;
};

interface IBody extends TBody {
   bio?: string | null;
   avatar?: File | null;
   cover?: File | null;
   fullname? : string | null;
   username? : string | null;
}

export const updateProfile = async (body: IBody, token: string) => {
   const formData = new FormData();
   Object.keys(body).map((key) => {
      if (body[key] !== null && body[key] !== undefined) {
         formData.append(key, body[key] as Blob);
      }
   });
   
   try {
      const response = await API.patch("profile", formData, {
         headers: {
            Authorization: `Bearer ${localStorage.token}` 
         },
      });
      return response.data;
   } catch (e) {
      console.log((e as Error).message)
   }
};