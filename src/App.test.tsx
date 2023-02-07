import { hashEntry, stringToBytes } from "./lib/utils/fileHasher";

test("renders learn react link", () => {
	let hash = hashEntry("name", "kari");
	console.log("hash", hash);
});
