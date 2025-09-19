import type { RoleResponse } from "../../../Role/Contracts/Responses/RoleResponse";

export type UserResponse = {
    id: number;
    name: string;
    email: string;
    roles: RoleResponse[];
};
