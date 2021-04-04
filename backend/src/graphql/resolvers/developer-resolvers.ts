import { pubsub } from '../pubsub';

const DEVELOPER_MUTATED = 'developerMutated';

export default {
    Query: {
        developers(parent, args, {dataSources}) {
            return dataSources.appService.getDevelopers();
        },

        developer(parent, args, {dataSources}) {
            return dataSources.appService.getDeveloper(args.id);
        }
    },

    Mutation: {
        createDeveloper(parent, args, {dataSources}) {
            return dataSources.appService
                .createDeveloper({
                    name: args.name
                })
                .then(dev => {
                    pubsub.publish(DEVELOPER_MUTATED, {
                        developerMutated: {
                            mutation: 'CREATED',
                            node: dev
                        }
                    });
                    return dev;
                });
        },
        updateDeveloper(parent, args, {dataSources}) {
            return dataSources.appService
                .updateDeveloper(args.developerId, {
                    name: args.name
                })
                .then(dev => {
                    pubsub.publish(DEVELOPER_MUTATED, {
                        developerMutated: {
                            mutation: 'UPDATED',
                            node: dev
                        }
                    });
                    return dev;
                });
        }
    },

    Subscription: {
        developerMutated: {
            subscribe: () => pubsub.asyncIterator(DEVELOPER_MUTATED)
        }
    },

    Developer: {
        apps(parent, args, {dataSources}) {
            return dataSources.appService.getDeveloperApps(parent.id);
        }
    }
};
