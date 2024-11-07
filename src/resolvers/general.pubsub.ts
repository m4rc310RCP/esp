import { createPubSub } from "@graphql-yoga/subscription";
import { IHeartBeatPayload } from '@root/resolvers/heartbeat/heartbeat.type';

export const enum Topic {
	DATE_UPDATE = "date-update",
}

export const generalPubsub = createPubSub<{
	[Topic.DATE_UPDATE]: [IHeartBeatPayload]
} & Record<string, [IHeartBeatPayload]>>();