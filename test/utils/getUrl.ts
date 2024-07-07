import { basename } from "./basename";

export function getUrl(route: string) {
	const bug_id = process.env.BUG_ID;

	return `${basename}/${route}${
		bug_id ? `?bug_id=${bug_id}` : ""
	}`;
}