import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TestMessage {
	@Field(_type => String)
	message: String;

	constructor(message: String) {
		this.message = message;
	}
}

export interface ITestMessagePayload {
	message: String;
}