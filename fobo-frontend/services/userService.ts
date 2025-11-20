import api from "../api/axiosInstance";
import { User } from "../types/auth";

const userService = {
  getUserById: (id: string) => api.get<User>(`/user/${id}`),
  updateProfile: (payload: Partial<User>) => api.put(`/user/update`, payload),
};

export default userService;
