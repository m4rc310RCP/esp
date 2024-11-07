import { createPubSub } from "@graphql-yoga/subscription";
import { IHeartBeatPayload } from '@root/resolvers/heartbeat/heartbeat.type';
import { ITestMessagePayload } from '@root/resolvers/test/test.type';

export const enum Topic {
	DATE_UPDATE = "date-update",
	TEST_MESSAGE = 'test_message'
}

export const generalPubsub = createPubSub<{
	[Topic.DATE_UPDATE]: [IHeartBeatPayload]
	[Topic.TEST_MESSAGE]: [ITestMessagePayload]
} & Record<string, [IHeartBeatPayload]>>();