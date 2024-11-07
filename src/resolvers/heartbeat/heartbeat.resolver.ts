import { Query, Resolver, Root, Subscription } from "type-graphql";
import { IHeartBeatPayload, HeartBeat } from '@root/resolvers/heartbeat/heartbeat.type';
import { Topic } from '@root/resolvers/general.pubsub';

@Resolver()
export class HeartBeatResolver {
	@Query()
	startup(): string {
		return "OK";
	}

	@Subscription({ topics: Topic.DATE_UPDATE })
	heartBeatSubscription(@Root() { date }: IHeartBeatPayload): HeartBeat {
		return { date };
	}
}