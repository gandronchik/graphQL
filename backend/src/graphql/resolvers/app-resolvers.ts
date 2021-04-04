import { pubsub } from '../pubsub';

const APP_MUTATED = 'appMutated';

export default {
    Query: {
        apps(parent, args, {dataSources}) {
            return dataSources.appService.getApps();
        },
        app(parent, args, {dataSources}) {
            return dataSources.appService.getApp(args.id);
        }
    },

    Mutation: {
        createApp(parent, args, {dataSources}) {
            const { publisherId, ...rest } = args.app;
            return dataSources.appService
                .createApp(
                    {
                        ...rest
                    },
                    publisherId
                )
                .then(app => {
                    pubsub.publish(APP_MUTATED, {
                        appMutated: {
                            mutation: 'CREATED',
                            node: app
                        }
                    });
                    return app;
                });
        },
        updateApp(parent, args, {dataSources}) {
            const { publisherId, ...rest } = args.app;
            return dataSources.appService
                .updateApp(
                    args.appId,
                    {
                        ...rest
                    },
                    publisherId
                )
                .then(publishAppUpdated);
        },
        setAppDevelopers(parent, args, {dataSources}) {
            return dataSources.appService
                .setAppDevelopers(args.appId, args.developerIds)
                .then(publishAppUpdated);
        }
    },

    Subscription: {
        appMutated: {
            subscribe: () => pubsub.asyncIterator(APP_MUTATED)
        }
    },

    App: {
        publisher(parent, args, {dataSources}) {
            return dataSources.appService.getAppPublisher(parent.id);
        },
        developers(parent, args, {dataSources}) {
            return dataSources.appService.getAppDevelopers(parent.id);
        }
    }
};

function publishAppUpdated(app) {
    pubsub.publish(APP_MUTATED, {
        appMutated: {
            mutation: 'UPDATED',
            node: app
        }
    });
    return app;
}
