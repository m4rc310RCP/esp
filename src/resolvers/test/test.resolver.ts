import { Arg, Args, Mutation, Query, Resolver, Root, Subscription } from "type-graphql";
import { ITestMessagePayload, TestMessage } from '@root/resolvers/test/test.type';
import { generalPubsub } from '@root/resolvers/general.pubsub';
import { Topic } from '@root/resolvers/general.pubsub';

@Resolver()
export class TestMessageResolver {

	@Mutation(returns => Boolean)
	async sendMessage(@Arg('message') message: String): Promise<boolean> {
		generalPubsub.publish(Topic.TEST_MESSAGE, { message });
		return true;
	}

	@Subscription(() => TestMessage, { topics: Topic.TEST_MESSAGE })
	async messageSubscription(@Root() { message }: ITestMessagePayload): Promise<TestMessage> {
		return { message };
	}
}