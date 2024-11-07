import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class HeartBeat {
	@Field(_type => Date)
	date: Date;

	constructor(date: Date) {
		this.date = date;
	}
}

export interface IHeartBeatPayload {
	date: Date;
}