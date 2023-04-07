import { UserFormProps } from ".";

declare global {
	namespace Express {
		export interface Request {
			user: Partial<UserFormProps>
		}
	}
}