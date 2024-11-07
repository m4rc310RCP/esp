import "reflect-metadata";
import 'module-alias/register';
import http from "node:http";
import path from "node:path";
import { readFileSync } from "node:fs";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { HeartBeatResolver } from '@resolvers/heartbeat/heartbeat.resolver';
import { TestMessageResolver } from '@resolvers/test/test.resolver';
import { generalPubsub, Topic } from '@root/resolvers/general.pubsub';


const overview = path.resolve(__dirname, "overview.html");
const overviewHtml = readFileSync(overview, 'utf-8');

async function startup() {
	const schema = await buildSchema({
		resolvers: [HeartBeatResolver, TestMessageResolver],
		emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
		pubSub: generalPubsub
	});

	const yoga = createYoga({
		schema,
		graphqlEndpoint: "/graphql",
	});

	const httpServer = http.createServer((req, res) => {
		if (req.url === '/') {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(overviewHtml);
		} else {
			yoga(req, res);
		}
	});

	setInterval(() => {
		generalPubsub.publish(Topic.DATE_UPDATE, {
			date: new Date()
		});
		// pubSub.publish("TIME_UPDATE", {
		//   currentTime: new Date().toISOString(),
		// });
	}, 3000);

	httpServer.listen(3000, () => {
		console.log(`GraphQL server ready!`);
	});
}

startup().catch(console.error);